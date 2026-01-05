from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware


import google.generativeai as genai 

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model
class Item(BaseModel):
    propertyType: str
    bhk: str
    area: str
    bathrooms: str
    designStyle: str
    materialQuality: str
    furnishingLevel: str
    workScope: List[str]
    currentPhotos: List[Dict[str, Any]]  # Adjusted to accept list of objects
    inspirationPhotos: List[Dict[str, Any]]  # Same here
    budget: str
    completionTime: str
    city: str
    pincode: str
    fullName: str
    email: str
    phone: str

@app.post("/form/")
def estimated_price(item: Item):  # Accept request body
    # You can now access individual fields via `item.propertyType`, `item.area`, etc.

    # client = genai.Client()

    # response = client.models.generate_content(
    #     model="gemini-2.5-flash",
    #     contents="How does AI work?"
    # )
    # print(response.text)


     # Correct import

    genai.configure(api_key="AIzaSyCw8YJ697rvQSbzOO6677yPhZekbKlNjZc")  # Replace with your actual API key

    model = genai.GenerativeModel("gemini-2.5-flash")  # Or "gemini-1.5-pro", etc.

    response = model.generate_content(f"Your are AI real estate expert. You are given the following details of a property {item.dict()} and you have to provide an estimated price for the property in INR. Provide only the price in INR without any other text. and format the number with commas. For example, 25,00,000 for 25 lakhs or 1,20,00,000 for 1.2 crores. and INR or Ruppes symbol")
    print(response.text)


    return {
        "message": "Data received successfully!",
        # "received_data": item.dict(),
        "estimated_price": response.text
    }


@app.post("/genrate/")
def genrate():

    
    return {

    }