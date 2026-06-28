from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/diagnoses", tags=["diagnoses"])


@router.get("/", response_model=List[schemas.DiagnosisRead])
def get_diagnoses(db: Session = Depends(get_db)):
    items = db.query(models.Diagnosis).all()
    return [schemas.DiagnosisRead.model_validate(i) for i in items]


@router.post("/", response_model=schemas.DiagnosisRead, status_code=201)
def create_diagnosis(payload: schemas.DiagnosisCreate, db: Session = Depends(get_db)):
    item = models.Diagnosis(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return schemas.DiagnosisRead.model_validate(item)


@router.get("/{item_id}", response_model=schemas.DiagnosisRead)
def get_diagnosis(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Diagnosis).filter(models.Diagnosis.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Diagnosis not found")
    return schemas.DiagnosisRead.model_validate(item)


@router.put("/{item_id}", response_model=schemas.DiagnosisRead)
def update_diagnosis(item_id: int, payload: schemas.DiagnosisUpdate, db: Session = Depends(get_db)):
    item = db.query(models.Diagnosis).filter(models.Diagnosis.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Diagnosis not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return schemas.DiagnosisRead.model_validate(item)


@router.delete("/{item_id}", status_code=204)
def delete_diagnosis(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Diagnosis).filter(models.Diagnosis.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Diagnosis not found")
    db.delete(item)
    db.commit()