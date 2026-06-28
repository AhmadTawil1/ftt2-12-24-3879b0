from typing import List, Type
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(tags=["simple-entities"])


def make_crud(prefix: str, model_cls: Type):
    """Factory that registers 5 CRUD routes for an id-only entity."""

    @router.get(f"/{prefix}/", response_model=List[schemas.SimpleEntityRead])
    def list_items(db: Session = Depends(get_db)):
        items = db.query(model_cls).all()
        return [schemas.SimpleEntityRead.model_validate(i) for i in items]

    @router.post(f"/{prefix}/", response_model=schemas.SimpleEntityRead, status_code=201)
    def create_item(db: Session = Depends(get_db)):
        item = model_cls()
        db.add(item)
        db.commit()
        db.refresh(item)
        return schemas.SimpleEntityRead.model_validate(item)

    @router.get(f"/{prefix}/{{item_id}}", response_model=schemas.SimpleEntityRead)
    def get_item(item_id: int, db: Session = Depends(get_db)):
        item = db.query(model_cls).filter(model_cls.id == item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail=f"{model_cls.__name__} not found")
        return schemas.SimpleEntityRead.model_validate(item)

    @router.delete(f"/{prefix}/{{item_id}}", status_code=204)
    def delete_item(item_id: int, db: Session = Depends(get_db)):
        item = db.query(model_cls).filter(model_cls.id == item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail=f"{model_cls.__name__} not found")
        db.delete(item)
        db.commit()


# Register all simple entities
make_crud("fathers", models.Father)
make_crud("mothers", models.Mother)
make_crud("32-week-lengths", models.WeekLength32)
make_crud("32-week-masses", models.WeekMass32)
make_crud("16-week-lengths", models.WeekLength16)
make_crud("16-week-masses", models.WeekMass16)
make_crud("6-month-weights", models.Weight6Month)
make_crud("12-month-weights", models.Weight12Month)
make_crud("18-month-weights", models.Weight18Month)
make_crud("24-month-weights", models.Weight24Month)
make_crud("36-month-weights", models.Weight36Month)
make_crud("48-month-weights", models.Weight48Month)
make_crud("60-month-weights", models.Weight60Month)
make_crud("birth-weights", models.BirthWeight)
make_crud("zincs", models.Zinc)
make_crud("concentrating-formulas", models.ConcentratingFormula)
make_crud("glucose-polymers", models.GlucosePolymers)
make_crud("irons", models.Iron)
make_crud("extra-lipids", models.ExtraLipids)
make_crud("proteins", models.Protein)