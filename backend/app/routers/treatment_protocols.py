from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/treatment-protocols", tags=["treatment-protocols"])


@router.get("/", response_model=List[schemas.TreatmentProtocolRead])
def get_protocols(db: Session = Depends(get_db)):
    items = db.query(models.TreatmentProtocol).all()
    return [schemas.TreatmentProtocolRead.model_validate(i) for i in items]


@router.post("/", response_model=schemas.TreatmentProtocolRead, status_code=201)
def create_protocol(payload: schemas.TreatmentProtocolCreate, db: Session = Depends(get_db)):
    item = models.TreatmentProtocol(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return schemas.TreatmentProtocolRead.model_validate(item)


@router.get("/{item_id}", response_model=schemas.TreatmentProtocolRead)
def get_protocol(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.TreatmentProtocol).filter(
        models.TreatmentProtocol.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="TreatmentProtocol not found")
    return schemas.TreatmentProtocolRead.model_validate(item)


@router.put("/{item_id}", response_model=schemas.TreatmentProtocolRead)
def update_protocol(item_id: int, payload: schemas.TreatmentProtocolUpdate, db: Session = Depends(get_db)):
    item = db.query(models.TreatmentProtocol).filter(
        models.TreatmentProtocol.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="TreatmentProtocol not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return schemas.TreatmentProtocolRead.model_validate(item)


@router.delete("/{item_id}", status_code=204)
def delete_protocol(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.TreatmentProtocol).filter(
        models.TreatmentProtocol.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="TreatmentProtocol not found")
    db.delete(item)
    db.commit()