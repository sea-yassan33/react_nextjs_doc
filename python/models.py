# -*- encoding: utf-8 -*-
import datetime
import uuid
import sys
from sqlalchemy import (Column, String,Integer, Text, ForeignKey,CHAR, VARCHAR, INT, create_engine, MetaData, DECIMAL, DATETIME, exc, event, Index, and_)
from sqlalchemy.ext.declarative import declarative_base
sys.dont_write_bytecode = True
## SQLAlchemyのベースクラスを定義  
Base = declarative_base()
## Exercise_tableモデルクラスの定義
class Exercise_table(Base):
  __tablename__ = 'exercise_table'
  id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column(VARCHAR(255))
  eventKey = Column(VARCHAR(255))
  eventLabel = Column(VARCHAR(255))
  exerciseTime = Column(VARCHAR(255))
  overveiew = Column(VARCHAR(255))
  youtubeID = Column(VARCHAR(255))
  videoUrl = Column(VARCHAR(255))
  delet_flag = Column(Integer, default=0)
  create_at = Column(DATETIME, default=datetime.datetime.now)
  updated_at = Column(DATETIME, default=datetime.datetime.now, onupdate=datetime.datetime.now)
## Reserv_tableモデルクラスの定義
class Reserv_table(Base):
  __tablename__ = 'reserv_table'
  id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column(VARCHAR(255))
  email = Column(VARCHAR(255))
  reserv_date = Column(DATETIME)
  inquiry_detail = Column(VARCHAR(255))
  delet_flag = Column(Integer, default=0)
  create_at = Column(DATETIME, default=datetime.datetime.now)
  updated_at = Column(DATETIME, default=datetime.datetime.now, onupdate=datetime.datetime.now)