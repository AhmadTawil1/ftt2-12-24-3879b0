from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/implication-sets", tags=["implication-sets"])


@router.get("/", response_model=List[schemas.ImplicationSetRead])
def get_implication_sets(db: Session = Depends(get_db)):
    items = db.query(models.ImplicationSet).all()
    return [schemas.ImplicationSetRead.model_validate(i) for i in items]


@router.post("/", response_model=schemas.ImplicationSetRead, status_code=201)
def create_implication_set(payload: schemas.ImplicationSetCreate, db: Session = Depends(get_db)):
    item = models.ImplicationSet(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return schemas.ImplicationSetRead.model_validate(item)


@router.get("/{item_id}", response_model=schemas.ImplicationSetRead)
def get_implication_set(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.ImplicationSet).filter(
        models.ImplicationSet.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="ImplicationSet not found")
    return schemas.ImplicationSetRead.model_validate(item)


@router.put("/{item_id}", response_model=schemas.ImplicationSetRead)
def update_implication_set(item_id: int, payload: schemas.ImplicationSetUpdate, db: Session = Depends(get_db)):
    item = db.query(models.ImplicationSet).filter(
        models.ImplicationSet.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="ImplicationSet not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return schemas.ImplicationSetRead.model_validate(item)


@router.delete("/{item_id}", status_code=204)
def delete_implication_set(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.ImplicationSet).filter(
        models.ImplicationSet.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="ImplicationSet not found")
    db.delete(item)
    db.commit()