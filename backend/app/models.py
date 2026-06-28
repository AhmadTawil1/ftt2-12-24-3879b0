from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON, Text
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    role = Column(String, nullable=True)
    height = Column(Float, nullable=True)


class Child(Base):
    __tablename__ = "children"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    currentWeight = Column(Float, nullable=True)
    age = Column(Float, nullable=True)
    gender = Column(String, nullable=True)
    perinatalParameters = Column(JSON, nullable=True)
    postnatalParameters = Column(JSON, nullable=True)


class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    childId = Column(Integer, ForeignKey("children.id"), nullable=True)
    fetalBirthWeightIndication = Column(String, nullable=True)
    fetalGrowthIndication = Column(String, nullable=True)
    postnatalGrowthIndication = Column(String, nullable=True)
    firstTrimesterPi = Column(Float, nullable=True)
    lastTrimesterPi = Column(Float, nullable=True)
    birthPercentile = Column(String, nullable=True)
    month6Percentile = Column(String, nullable=True)
    month12Percentile = Column(String, nullable=True)
    month18Percentile = Column(String, nullable=True)
    month24Percentile = Column(String, nullable=True)
    month36Percentile = Column(String, nullable=True)
    month48Percentile = Column(String, nullable=True)
    month60Percentile = Column(String, nullable=True)


class PostnatalGrowthAnalysis(Base):
    __tablename__ = "postnatal_growth_analyses"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    diagnosisId = Column(Integer, ForeignKey("diagnoses.id"), nullable=True)
    majorPercentilesCrossed = Column(Integer, nullable=True)
    severity = Column(Integer, nullable=True)
    lastPercentileAge = Column(String, nullable=True)
    period1PercentilesCrossed = Column(Integer, nullable=True)
    lastPercentileAgePeriod1 = Column(String, nullable=True)
    period2PercentilesCrossed = Column(Integer, nullable=True)
    lastPercentileAgePeriod2 = Column(String, nullable=True)
    period3PercentilesCrossed = Column(Integer, nullable=True)


class TreatmentProtocol(Base):
    __tablename__ = "treatment_protocols"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    diagnosisId = Column(Integer, ForeignKey("diagnoses.id"), nullable=True)
    dailyCaloricValue = Column(Float, nullable=True)
    medianWeight = Column(Float, nullable=True)
    multiCaloriesProducts = Column(JSON, nullable=True)
    micronutrients = Column(JSON, nullable=True)


class ImplicationSet(Base):
    __tablename__ = "implication_sets"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    diagnosisId = Column(Integer, ForeignKey("diagnoses.id"), nullable=True)
    description = Column(Text, nullable=True)


class Father(Base):
    __tablename__ = "fathers"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Mother(Base):
    __tablename__ = "mothers"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class WeekLength32(Base):
    __tablename__ = "week_lengths_32"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class WeekMass32(Base):
    __tablename__ = "week_masses_32"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class WeekLength16(Base):
    __tablename__ = "week_lengths_16"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class WeekMass16(Base):
    __tablename__ = "week_masses_16"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Weight6Month(Base):
    __tablename__ = "weights_6month"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Weight12Month(Base):
    __tablename__ = "weights_12month"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Weight18Month(Base):
    __tablename__ = "weights_18month"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Weight24Month(Base):
    __tablename__ = "weights_24month"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Weight36Month(Base):
    __tablename__ = "weights_36month"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Weight48Month(Base):
    __tablename__ = "weights_48month"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Weight60Month(Base):
    __tablename__ = "weights_60month"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class BirthWeight(Base):
    __tablename__ = "birth_weights"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Zinc(Base):
    __tablename__ = "zincs"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class ConcentratingFormula(Base):
    __tablename__ = "concentrating_formulas"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class GlucosePolymers(Base):
    __tablename__ = "glucose_polymers"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Iron(Base):
    __tablename__ = "irons"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class ExtraLipids(Base):
    __tablename__ = "extra_lipids"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)


class Protein(Base):
    __tablename__ = "proteins"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)