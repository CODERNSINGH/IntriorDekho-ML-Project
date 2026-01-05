import React, { useState } from "react";

export default function Estimated() {
  const [formData, setFormData] = useState({
    propertyType: "",
    bhk: "",
    area: "",
    bathrooms: "",
    designStyle: "",
    materialQuality: "",
    furnishingLevel: "",
    workScope: [],
    currentPhotos: [],
    inspirationPhotos: [],
    budget: "",
    completionTime: "",
    city: "",
    pincode: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const newWorkScope = checked
          ? [...prev.workScope, value]
          : prev.workScope.filter((item) => item !== value);
        return { ...prev, workScope: newWorkScope };
      });
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = await fetch("http://127.0.0.1:8000/form/",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
    )
    console.log(data)
    console.log({ item: formData });
  };

  return (
    <div className="estimated justify-center items-center flex mt-10">
      <form
        id="price-form"
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-orange-400">
          AI Interior Design Price Estimator
        </h1>

        {/* Property Details */}
        <section>
          <h2 className="text-xl font-semibold border-l-4 text-orange-400 pl-2 mb-3">
            Property Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">BHK / Room Count</label>
              <input
                type="text"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                placeholder="e.g. 3BHK"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Total Area (sq.ft)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. 1200"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* Design Preferences */}
        <section>
          <h2 className="text-xl font-semibold border-l-4 text-orange-400 pl-2 mb-3">
            Design Preferences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Design Style</label>
              <select
                name="designStyle"
                value={formData.designStyle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Style</option>
                <option value="Modern">Modern</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Luxury">Luxury</option>
                <option value="Traditional">Traditional</option>
                <option value="Bohemian">Bohemian</option>
                <option value="Industrial">Industrial</option>
                <option value="Scandinavian">Scandinavian</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Material Quality</label>
              <select
                name="materialQuality"
                value={formData.materialQuality}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Quality</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Furnishing Level</label>
              <select
                name="furnishingLevel"
                value={formData.furnishingLevel}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Level</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully-Furnished">Fully-Furnished</option>
              </select>
            </div>
          </div>
        </section>

        {/* Work Scope */}
        <section>
          <h2 className="text-xl font-semibold border-l-4 text-orange-400 pl-2 mb-3">Work Scope</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {["Electrical","Painting","False Ceiling","Furniture","Kitchen","Flooring"].map((work) => (
              <label key={work} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={work}
                  checked={formData.workScope.includes(work)}
                  onChange={handleChange}
                  className="accent-indigo-500"
                />
                <span>{work}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Upload Images */}
        <section>
          <h2 className="text-xl font-semibold border-l-4 text-orange-400 pl-2 mb-3">Upload Images</h2>
          <div className="space-y-3">
            <div>
              <label className="block font-medium mb-1">Upload Current Room Photos</label>
              <input
                type="file"
                name="currentPhotos"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Upload Inspiration Photos (Optional)</label>
              <input
                type="file"
                name="inspirationPhotos"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </section>

        {/* Budget & Timeline */}
        <section>
          <h2 className="text-xl font-semibold border-l-4 text-orange-400 pl-2 mb-3">Budget & Timeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Estimated Budget (₹)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. 500000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Completion Time</label>
              <select
                name="completionTime"
                value={formData.completionTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Time</option>
                <option value="1 month">1 month</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-xl font-semibold border-l-4 text-orange-400 pl-2 mb-3">Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Delhi"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Pincode / Area</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g. 110001"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-xl font-semibold border-l-4 text-orange-400 pl-2 mb-3">Contact Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold text-lg py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Get Price Estimate
        </button>
      </form>
    </div>
  );
}
