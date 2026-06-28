from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict


# ── User ──────────────────────────────────────────────────────────────────────

class UserBase(BaseModel):
    role: Optional[str] = None
    height: Optional[float] = None


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class UserUpdate(UserBase):
    pass


# ── Child ─────────────────────────────────────────────────────────────────────

class ChildBase(BaseModel):
    currentWeight: Optional[float] = None
    age: Optional[float] = None
    gender: Optional[str] = None
    perinatalParameters: Optional[Dict[str, Any]] = None
    postnatalParameters: Optional[Dict[str, Any]] = None


class ChildCreate(ChildBase):
    pass


class ChildRead(ChildBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ChildUpdate(ChildBase):
    pass


# ── Diagnosis ─────────────────────────────────────────────────────────────────

class DiagnosisBase(BaseModel):
    childId: Optional[int] = None
    fetalBirthWeightIndication: Optional[str] = None
    fetalGrowthIndication: Optional[str] = None
    postnatalGrowthIndication: Optional[str] = None
    firstTrimesterPi: Optional[float] = None
    lastTrimesterPi: Optional[float] = None
    birthPercentile: Optional[str] = None
    month6Percentile: Optional[str] = None
    month12Percentile: Optional[str] = None
    month18Percentile: Optional[str] = None
    month24Percentile: Optional[str] = None
    month36Percentile: Optional[str] = None
    month48Percentile: Optional[str] = None
    month60Percentile: Optional[str] = None


class DiagnosisCreate(DiagnosisBase):
    pass


class DiagnosisRead(DiagnosisBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class DiagnosisUpdate(DiagnosisBase):
    pass


# ── PostnatalGrowthAnalysis ───────────────────────────────────────────────────

class PostnatalGrowthAnalysisBase(BaseModel):
    diagnosisId: Optional[int] = None
    majorPercentilesCrossed: Optional[int] = None
    severity: Optional[int] = None
    lastPercentileAge: Optional[str] = None
    period1PercentilesCrossed: Optional[int] = None
    lastPercentileAgePeriod1: Optional[str] = None
    period2PercentilesCrossed: Optional[int] = None
    lastPercentileAgePeriod2: Optional[str] = None
    period3PercentilesCrossed: Optional[int] = None


class PostnatalGrowthAnalysisCreate(PostnatalGrowthAnalysisBase):
    pass


class PostnatalGrowthAnalysisRead(PostnatalGrowthAnalysisBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class PostnatalGrowthAnalysisUpdate(PostnatalGrowthAnalysisBase):
    pass


# ── TreatmentProtocol ─────────────────────────────────────────────────────────

class TreatmentProtocolBase(BaseModel):
    diagnosisId: Optional[int] = None
    dailyCaloricValue: Optional[float] = None
    medianWeight: Optional[float] = None
    multiCaloriesProducts: Optional[Dict[str, Any]] = None
    micronutrients: Optional[Dict[str, Any]] = None


class TreatmentProtocolCreate(TreatmentProtocolBase):
    pass


class TreatmentProtocolRead(TreatmentProtocolBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class TreatmentProtocolUpdate(TreatmentProtocolBase):
    pass


# ── ImplicationSet ────────────────────────────────────────────────────────────

class ImplicationSetBase(BaseModel):
    diagnosisId: Optional[int] = None
    description: Optional[str] = None


class ImplicationSetCreate(ImplicationSetBase):
    pass


class ImplicationSetRead(ImplicationSetBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ImplicationSetUpdate(ImplicationSetBase):
    pass


# ── Simple entity (id-only) ───────────────────────────────────────────────────

class SimpleEntityRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int


class SimpleEntityCreate(BaseModel):
    pass


# ── Process ───────────────────────────────────────────────────────────────────

class ProcessRequest(BaseModel):
    data: Optional[Dict[str, Any]] = None


class ProcessResponse(BaseModel):
    status: str
    result: Optional[Dict[str, Any]] = None