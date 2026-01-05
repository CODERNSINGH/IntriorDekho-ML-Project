# from fastapi import FastAPI



# app = FastAPI() # instantiate the FastAPI application

# @app.get("/") # decorator to define a GET endpoint at the root URL
# def read_root():
#     return {"Hello": "World"}


# @app.post("/name/") # decorator to define a POST endpoint with a path parameter
# def create_name(name: str,roll: int):
#     return {
#         "name": name,
#         "roll": roll
#         }


# from fastapi import FastAPI, UploadFile, Form
# from fastapi.responses import FileResponse
# from diffusers import StableDiffusionInstructPix2PixPipeline
# from PIL import Image
# import torch
# import tempfile

# app = FastAPI()

# # Load model once
# print("🔄 Loading AI model... (takes ~1 min first time)")
# pipe = StableDiffusionInstructPix2PixPipeline.from_pretrained(
#     "timbrooks/instruct-pix2pix",
#     torch_dtype=torch.float16,
#     safety_checker=None
# ).to("mps")

# @app.post("/redesign")
# async def redesign_room(file: UploadFile, prompt: str = Form(...)):
#     # Save uploaded image temporarily
#     temp_input = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
#     temp_input.write(await file.read())
#     temp_input.close()

#     # Open image
#     image = Image.open(temp_input.name).convert("RGB")

#     # Run AI generation
#     result = pipe(
#         prompt=prompt,
#         image=image,
#         num_inference_steps=30,
#         image_guidance_scale=1.5
#     ).images[0]

#     # Save result
#     output_path = tempfile.mktemp(suffix=".jpg")
#     result.save(output_path)

#     return FileResponse(output_path, media_type="image/jpeg")



from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
from diffusers import StableDiffusionInstructPix2PixPipeline
from PIL import Image
import torch
import tempfile

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# =========================
# BASIC TEST ENDPOINTS
# =========================

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/name/")
def create_name(name: str, roll: int):
    return {"name": name, "roll": roll}

# =========================
# LOAD MODEL ONCE (GLOBAL)
# =========================

print("🔄 Loading AI model... (first time takes ~1 min)")

pipe = StableDiffusionInstructPix2PixPipeline.from_pretrained(
    "timbrooks/instruct-pix2pix",
    torch_dtype=torch.float16
)

pipe = pipe.to("mps")  # Apple Silicon GPU

print("✅ Model loaded successfully!")

# =========================
# INTERIOR REDESIGN API
# =========================

@app.post("/redesign")
async def redesign_room(file: UploadFile, prompt: str = Form(...)):

    # Save input image
    temp_input = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
    temp_input.write(await file.read())
    temp_input.close()

    image = Image.open(temp_input.name).convert("RGB")

    # AI generation
    result = pipe(
        prompt=prompt,
        image=image,
        num_inference_steps=30,
        image_guidance_scale=1.5
    ).images[0]

    # Save output
    output_path = tempfile.mktemp(suffix=".jpg")
    result.save(output_path)

    return FileResponse(output_path, media_type="image/jpeg")

