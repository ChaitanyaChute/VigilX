from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = joblib.load("model.pkl")

class Transaction(BaseModel):
    feature1: float
    feature2: float
    feature3: float
    feature4: float
    feature5: float
    feature6: float
    feature7: float
    feature8: float
    feature9: float
    feature10: float
    feature11: float
    feature12: float
    feature13: float
    feature14: float
    feature15: float
    feature16: float
    feature17: float
    feature18: float
    feature19: float
    feature20: float
    feature21: float
    feature22: float
    feature23: float
    feature24: float
    feature25: float
    feature26: float
    feature27: float
    feature28: float
    feature29: float
    feature30: float


@app.post("/predict")
async def predict(transaction: Transaction):
    try:
        data = [[
            transaction.feature1, transaction.feature2, transaction.feature3,
            transaction.feature4, transaction.feature5, transaction.feature6,
            transaction.feature7, transaction.feature8, transaction.feature9,
            transaction.feature10, transaction.feature11, transaction.feature12,
            transaction.feature13, transaction.feature14, transaction.feature15,
            transaction.feature16, transaction.feature17, transaction.feature18,
            transaction.feature19, transaction.feature20, transaction.feature21,
            transaction.feature22, transaction.feature23, transaction.feature24,
            transaction.feature25, transaction.feature26, transaction.feature27,
            transaction.feature28, transaction.feature29, transaction.feature30
        ]]
        prediction = model.predict(data)
        return {"prediction": int(prediction[0])}
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict_csv")
async def predict_csv(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)

        num_cols = df.shape[1]

        if num_cols == 31:
            
            df = df.iloc[:, 1:]
        elif num_cols == 29:
            
            df.insert(0, "SerialNumber", range(1, len(df) + 1))
        elif num_cols != 30:
            return {"error": f"Expected 30 features but got {num_cols}. Please check your CSV."}

        preds = model.predict(df.values)
        df["prediction"] = preds

        frauds = df[df["prediction"] == 1]
        fraud_list = frauds.to_dict(orient="records")

        return {
            "total": len(df),
            "fraud_count": len(frauds),
            "fraud_transactions": fraud_list,
        }

    except Exception as e:
        return {"error": str(e)}