from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/postnatal-growth-analyses", tags=["postnatal-growth-analyses"])


@router.get("/", response_model=List[schemas.PostnatalGrowthAnalysisRead])
def get_analyses(db: Session = Depends(get_db)):
    items = db.query(models.PostnatalGrowthAnalysis).all()
    return [schemas.PostnatalGrowthAnalysisRead.model_validate(i) for i in items]


@router.post("/", response_model=schemas.PostnatalGrowthAnalysisRead, status_code=201)
def create_analysis(payload: schemas.PostnatalGrowthAnalysisCreate, db: Session = Depends(get_db)):
    item = models.PostnatalGrowthAnalysis(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return schemas.PostnatalGrowthAnalysisRead.model_validate(item)


@router.get("/{item_id}", response_model=schemas.PostnatalGrowthAnalysisRead)
def get_analysis(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.PostnatalGrowthAnalysis).filter(
        models.PostnatalGrowthAnalysis.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="PostnatalGrowthAnalysis not found")
    return schemas.PostnatalGrowthAnalysisRead.model_validate(item)


@router.put("/{item_id}", response_model=schemas.PostnatalGrowthAnalysisRead)
def update_analysis(item_id: int, payload: schemas.PostnatalGrowthAnalysisUpdate, db: Session = Depends(get_db)):
    item = db.query(models.PostnatalGrowthAnalysis).filter(
        models.PostnatalGrowthAnalysis.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="PostnatalGrowthAnalysis not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return schemas.PostnatalGrowthAnalysisRead.model_validate(item)


@router.delete("/{item_id}", status_code=204)
def delete_analysis(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.PostnatalGrowthAnalysis).filter(
        models.PostnatalGrowthAnalysis.id == item_id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="PostnatalGrowthAnalysis not found")
    db.delete(item)
    db.commit()