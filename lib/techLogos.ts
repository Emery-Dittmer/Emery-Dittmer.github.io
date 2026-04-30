import { StaticImageData } from 'next/image'

import alteryx      from '@/assets/logos/Alteryx_Logo.png'
import excel        from '@/assets/logos/excel_logo.png'
import powerbi      from '@/assets/logos/PowerBI_logo.png'
import python       from '@/assets/logos/python-logo-notext.png'
import r            from '@/assets/logos/rlogo.png'
import tableau      from '@/assets/logos/tableau_logo.png'
import mysql        from '@/assets/logos/logo-mysql.png'
import vba          from '@/assets/logos/vba_logo.png'
import gurobi       from '@/assets/logos/gurobi-logo.png'
import matlab       from '@/assets/logos/Matlab_logo.png'
import scikitlearn  from '@/assets/logos/scikitlearn_logo.png'
import tensorflow   from '@/assets/logos/tensorflow-logo.png'
import plotly       from '@/assets/logos/plotly-logo.png'
import neo4j        from '@/assets/logos/neo4j-logo-2020-1.png'
import esri         from '@/assets/logos/esri_logo.png'
import react        from '@/assets/logos/react-logo.png'
import django       from '@/assets/logos/django-logo.png'
import github       from '@/assets/logos/github-logo.png'

export const techLogos: Record<string, StaticImageData> = {
  alteryx,
  excel,
  powerbi,
  python,
  r,
  tableau,
  mysql,
  vba,
  gurobi,
  matlab,
  scikitlearn,
  tensorflow,
  plotly,
  neo4j,
  esri,
  react,
  django,
  github,
}

export type TechKey = keyof typeof techLogos
