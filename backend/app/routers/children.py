from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/children", tags=["children"])


@router.get("/", response_model=List[schemas.ChildRead])
def get_children(db: Session = Depends(get_db)):
    children = db.query(models.Child).all()
    return [schemas.ChildRead.model_validate(c) for c in children]


@router.post("/", response_model=schemas.ChildRead, status_code=201)
def create_child(payload: schemas.ChildCreate, db: Session = Depends(get_db)):
    child = models.Child(**payload.model_dump())
    db.add(child)
    db.commit()
    db.refresh(child)
    return schemas.ChildRead.model_validate(child)


@router.get("/{child_id}", response_model=schemas.ChildRead)
def get_child(child_id: int, db: Session = Depends(get_db)):
    child = db.query(models.Child).filter(models.Child.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    return schemas.ChildRead.model_validate(child)


@router.put("/{child_id}", response_model=schemas.ChildRead)
def update_child(child_id: int, payload: schemas.ChildUpdate, db: Session = Depends(get_db)):
    child = db.query(models.Child).filter(models.Child.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(child, key, value)
    db.commit()
    db.refresh(child)
    return schemas.ChildRead.model_validate(child)


@router.delete("/{child_id}", status_code=204)
def delete_child(child_id: int, db: Session = Depends(get_db)):
    child = db.query(models.Child).filter(models.Child.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    db.delete(child)
    db.commit()