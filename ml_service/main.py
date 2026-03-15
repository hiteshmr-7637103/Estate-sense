from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# Initialize FastAPI
app = FastAPI()

# Loading your pickled pipeline (contains both scaler and model)
pipeline = joblib.load("pipeline.pkl")

# Defining the input format (Boston Housing Features)
class HouseData(BaseModel):
    CRIM: float
    ZN: float
    INDUS: float
    CHAS: int
    NOX: float
    RM: float
    AGE: float
    DIS: float
    RAD: int
    TAX: float
    PTRATIO: float
    B: float
    LSTAT: float

@app.get("/")
def home():
    return {"message": "Estate Sense API is running"}

@app.post("/predict")
def predict_price(data: HouseData):
    # Convert input to array
    input_data = np.array([[
        data.CRIM, data.ZN, data.INDUS, data.CHAS, data.NOX, 
        data.RM, data.AGE, data.DIS, data.RAD, data.TAX, 
        data.PTRATIO, data.B, data.LSTAT
    ]])
    
    # Predict directly (pipeline handles scaling)
    prediction = pipeline.predict(input_data)
    
    return {"predicted_price": float(prediction[0])}