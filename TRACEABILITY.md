# Traceability

Every OPM element mapped to the artifact that implements it.

## Objects

| OPM id | Name | Implemented by |
| --- | --- | --- |
| O1 | Therapist Group | Entity `User` |
| O2 | Father | Entity `Father` |
| O3 | Mother | Entity `Mother` |
| O4 | Height | Field `User.height` |
| O5 | Child | Entity `Child` |
| O6 | Id | Field `Child.id` |
| O7 | Current Weight | Field `Child.currentWeight` |
| O8 | Perinatal Parameter Set | Field `Child.perinatalParameters` |
| O9 | 32-week Length | Entity `32-week Length` |
| O10 | 32-week Mass | Entity `32-week Mass` |
| O11 | Postnatal Parameter Set | Field `Child.postnatalParameters` |
| O12 | 16-week Length | Entity `16-week Length` |
| O13 | 16-week Mass | Entity `16-week Mass` |
| O14 | 6-month Weight | Entity `6-month Weight` |
| O15 | 12-month Weight | Entity `12-month Weight` |
| O16 | 18-month Weight | Entity `18-month Weight` |
| O17 | 24-month Weight | Entity `24-month Weight` |
| O18 | 36-month Weight | Entity `36-month Weight` |
| O19 | 48-month Weight | Entity `48-month Weight` |
| O20 | 60-month Weight | Entity `60-month Weight` |
| O21 | Gender | Field `Child.gender` |
| O22 | Birth Weight | Entity `Birth Weight` |
| O23 | Fetal Birth Weight Indication | Field `Diagnosis.fetalBirthWeightIndication` |
| O24 | Fetal Growth Indication | Field `Diagnosis.fetalGrowthIndication` |
| O25 | Postnatal Growth Indication | Field `Diagnosis.postnatalGrowthIndication` |
| O26 | Implication Set | Entity `ImplicationSet` |
| O27 | Treatment Protocol | Entity `TreatmentProtocol` |
| O28 | Diagnosis | Entity `Diagnosis` |
| O29 | First Trimester Pi | Field `Diagnosis.firstTrimesterPi` |
| O30 | Last Trimester Pi | Field `Diagnosis.lastTrimesterPi` |
| O31 | Birth Percentile | Field `Diagnosis.birthPercentile` |
| O32 | 6-month Percentile | Field `Diagnosis.month6Percentile` |
| O33 | 12-month Percentile | Field `Diagnosis.month12Percentile` |
| O34 | 18-month Percentile | Field `Diagnosis.month18Percentile` |
| O35 | 24-month Percentile | Field `Diagnosis.month24Percentile` |
| O36 | 36-month Percentile | Field `Diagnosis.month36Percentile` |
| O37 | 48-month Percentile | Field `Diagnosis.month48Percentile` |
| O38 | 60-month Percentile | Field `Diagnosis.month60Percentile` |
| O39 | Major Percentiles Crossed | Field `PostnatalGrowthAnalysis.majorPercentilesCrossed` |
| O40 | Severity | Field `PostnatalGrowthAnalysis.severity` |
| O41 | Last Percentile-age | Field `PostnatalGrowthAnalysis.lastPercentileAge` |
| O42 | Postnatal Growth Analysis | Entity `PostnatalGrowthAnalysis` |
| O43 | Period 1 Percentiles Crossed | Field `PostnatalGrowthAnalysis.period1PercentilesCrossed` |
| O44 | Last Percentile-Age-Period1 | Field `PostnatalGrowthAnalysis.lastPercentileAgePeriod1` |
| O45 | Period 2 Percentiles Crossed | Field `PostnatalGrowthAnalysis.period2PercentilesCrossed` |
| O46 | Last Percentile-age-period2 | Field `PostnatalGrowthAnalysis.lastPercentileAgePeriod2` |
| O47 | Period 3 Percentiles Crossed | Field `PostnatalGrowthAnalysis.period3PercentilesCrossed` |
| O48 | Daily Caloric Value | Field `TreatmentProtocol.dailyCaloricValue` |
| O49 | Age | Field `Child.age` |
| O50 | Median Weight | Field `TreatmentProtocol.medianWeight` |
| O51 | Multu Calories Product Set | Field `TreatmentProtocol.multiCaloriesProducts` |
| O52 | Micronutrient | Field `TreatmentProtocol.micronutrients` |
| O53 | Zinc | Entity `Zinc` |
| O54 | Concentrating Formula | Entity `Concentrating Formula` |
| O55 | Glucose Polymers | Entity `Glucose Polymers` |
| O56 | Iron | Entity `Iron` |
| O57 | Extra Lipids | Entity `Extra Lipids` |
| O58 | Protein | Entity `Protein` |

## Processes

| OPM id | Name | Implemented by |
| --- | --- | --- |
| P1 | FTT Diagnosing & Treating | `POST /ftt-diagnosing-treating` |
| P2 | Diagnosing | `POST /diagnosing` |
| P3 | Treatment Defining | `POST /treatment-defining` |
| P4 | Implication Defining | `POST /implication-defining` |
| P5 | Perinatal Growth Examining | `POST /perinatal-growth-examining` |
| P6 | Postnatal Growth Examining | `POST /postnatal-growth-examining` |
| P7 | FTT Determining | `POST /ftt-determining` |
| P8 | First Trimester Pi Calculating () | `POST /first-trimester-pi-calculating` |
| P9 | Last Trimester Pi Calculating () | `POST /last-trimester-pi-calculating` |
| P10 | Pi Analyzing () | `POST /pi-analyzing` |
| P11 | Birth Weight Analizing () | `POST /birth-weight-analizing` |
| P12 | Birth Percentile Calculating () | `POST /birth-percentile-calculating` |
| P13 | 6-month Percentile Calculating () | `POST /6-month-percentile-calculating` |
| P14 | 12-month Percentile Calculating () | `POST /12-month-percentile-calculating` |
| P15 | 18-month Percentile Calculating () | `POST /18-month-percentile-calculating` |
| P16 | 24-month Percentile Calculating () | `POST /24-month-percentile-calculating` |
| P17 | 36-month Percentile Calculating () | `POST /36-month-percentile-calculating` |
| P18 | 48-month Percentile Calculating () | `POST /48-month-percentile-calculating` |
| P19 | 60-month Percentile Calculating () | `POST /60-month-percentile-calculating` |
| P20 | Weight Gain Deceleration Analyzing | `POST /weight-gain-deceleration-analyzing` |
| P21 | Postnatal Growth Evaluating () | `POST /postnatal-growth-evaluating` |
| P22 | First Period Percentiles Cross Calculating () | `POST /first-period-percentiles-cross-calculating` |
| P23 | Last Percentile data getting (Period1) | `POST /last-percentile-data-getting-period1` |
| P24 | Second Period Percentiles Cross Calculating () | `POST /second-period-percentiles-cross-calculating` |
| P25 | Last Percentile data getting (Period2) | `POST /last-percentile-data-getting-period2` |
| P26 | Third Period Percentiles Cross Calculating () | `POST /third-period-percentiles-cross-calculating` |
| P27 | Last Percentile Data Getting (Overall) | `POST /last-percentile-data-getting-overall` |
| P28 | Total Percentiles Crossed Calculating () | `POST /total-percentiles-crossed-calculating` |
| P29 | Severity Evaluating () | `POST /severity-evaluating` |
| P30 | Nutrition Changing | `POST /nutrition-changing` |
| P31 | Medicine Taking | `POST /medicine-taking` |
| P32 | Family Guidance | `POST /family-guidance` |
| P33 | Hospitalization | `POST /hospitalization` |
| P34 | Median Weight Defining | `POST /median-weight-defining` |
| P35 | Daily Caloric Value Per Kilogram Calculatin () | `POST /daily-caloric-value-per-kilogram-calculatin` |
| P36 | Calories Dividing | `POST /calories-dividing` |
| P37 | Calories Strengthening | `POST /calories-strengthening` |
| P38 | Supplements Supplying | `POST /supplements-supplying` |

## Links

| OPM id | Type | Relationship |
| --- | --- | --- |
| L1 | agent | O1 → P1 |
| L2 | agent | O2 → P1 |
| L3 | agent | O3 → P1 |
| L4 | agent | O5 → P1 |
| L5 | agent | O5 → P3 |
| L6 | result | P4 → O26 |
| L7 | result | P35 → O48 |
| L8 | result | P7 → O28 |
| L9 | result | P10 → O24 |
| L10 | result | P8 → O29.6.4 |
| L11 | result | P9 → O30.2.2 |
| L12 | result | P11 → O23 |
| L13 | result | P34 → O50.value |
| L14 | result | P37 → O51 |
| L15 | result | P38 → O52 |
| L16 | result | P1 → O28 |
| L17 | result | P1 → O26 |
| L18 | result | P1 → O27 |
| L19 | result | P5 → O23 |
| L20 | result | P5 → O24 |
| L21 | result | P21 → O25 |
| L22 | result | P13 → O32.2-10 |
| L23 | result | P14 → O33.2-10 |
| L24 | result | P15 → O34.1-5 |
| L25 | result | P16 → O35.2-10 |
| L26 | result | P17 → O36.0-0 |
| L27 | result | P18 → O37.0-0 |
| L28 | result | P19 → O38.1-5 |
| L29 | result | P12 → O31.4-50 |
| L30 | result | P22 → O43.2 |
| L31 | result | P24 → O45.0 |
| L32 | result | P26 → O47.1 |
| L33 | result | P28 → O39.3 |
| L34 | result | P29 → O40.2 |
| L35 | result | P20 → O42 |
| L36 | result | P23 → O44.2-6 |
| L37 | result | P25 → O46.2-24 |
| L38 | result | P27 → O41.1-60 |
| L39 | result | P2 → O28 |
| L40 | result | P3 → O27 |
| L41 | result | P30 → O48 |
| L42 | instrument | O28 → P4 |
| L43 | instrument | O28 → P3 |
| L44 | instrument | O13.100 → P8 |
| L45 | instrument | O12.11.6 → P8 |
| L46 | instrument | O10.1702 → P9 |
| L47 | instrument | O9.42.4 → P9 |
| L48 | instrument | O29.6.4 → P10 |
| L49 | instrument | O30.2.2 → P10 |
| L50 | instrument | O22.3.3 → P11 |
| L51 | instrument | O21.boy → P34 |
| L52 | instrument | O49.value → P34 |
| L53 | instrument | O7.value → P35 |
| L54 | instrument | O27 → P4 |
| L55 | instrument | O25 → P7 |
| L56 | instrument | O23 → P7 |
| L57 | instrument | O24 → P7 |
| L58 | instrument | O14.7 → P13 |
| L59 | instrument | O21.boy → P13 |
| L60 | instrument | O15.8.6 → P14 |
| L61 | instrument | O21.boy → P14 |
| L62 | instrument | O16.9.4 → P15 |
| L63 | instrument | O21.boy → P15 |
| L64 | instrument | O17.10.5 → P16 |
| L65 | instrument | O21.boy → P16 |
| L66 | instrument | O18.11.5 → P17 |
| L67 | instrument | O21.boy → P17 |
| L68 | instrument | O19.12 → P18 |
| L69 | instrument | O21.boy → P18 |
| L70 | instrument | O20.15 → P19 |
| L71 | instrument | O21.boy → P19 |
| L72 | instrument | O22.3.3 → P12 |
| L73 | instrument | O21.boy → P12 |
| L74 | instrument | O43.2 → P28 |
| L75 | instrument | O45.0 → P28 |
| L76 | instrument | O47.1 → P28 |
| L77 | instrument | O43.2 → P29 |
| L78 | instrument | O45.0 → P29 |
| L79 | instrument | O47.1 → P29 |
| L80 | instrument | O31.4-50 → P20 |
| L81 | instrument | O32.2-10 → P20 |
| L82 | instrument | O33.2-10 → P20 |
| L83 | instrument | O34.1-5 → P20 |
| L84 | instrument | O35.2-10 → P20 |
| L85 | instrument | O36.0-0 → P20 |
| L86 | instrument | O37.0-0 → P20 |
| L87 | instrument | O38.1-5 → P20 |
| L88 | instrument | O31.4-50 → P22 |
| L89 | instrument | O32.2-10 → P22 |
| L90 | instrument | O33.2-10 → P24 |
| L91 | instrument | O34.1-5 → P24 |
| L92 | instrument | O35.2-10 → P24 |
| L93 | instrument | O44.2-6 → P24 |
| L94 | instrument | O36.0-0 → P26 |
| L95 | instrument | O37.0-0 → P26 |
| L96 | instrument | O38.1-5 → P26 |
| L97 | instrument | O46.2-24 → P26 |
| L98 | instrument | O8 → P1 |
| L99 | instrument | O11 → P1 |
| L100 | instrument | O8 → P5 |
| L101 | instrument | O11 → P6 |
| L102 | instrument | O48 → P36 |
| L103 | instrument | O40.2 → P21 |
| L104 | instrument | O39.3 → P21 |
| L105 | instrument | O6.345637 → P21 |
| L106 | instrument | O41.1-60 → P21 |
| L107 | consumption | O50.value → P35 |
| L108 | consumption | O33.2-10 → P25 |
| L109 | consumption | O34.1-5 → P25 |
| L110 | consumption | O35.2-10 → P25 |
| L111 | consumption | O31.4-50 → P23 |
| L112 | consumption | O32.2-10 → P23 |
| L113 | consumption | O44.2-6 → P25 |
| L114 | consumption | O46.2-24 → P27 |
| L115 | consumption | O36.0-0 → P27 |
| L116 | consumption | O37.0-0 → P27 |
| L117 | consumption | O38.1-5 → P27 |
| L118 | contains | SD → P1 |
| L119 | contains | SD1 → P2 |
| L120 | contains | SD1 → P3 |
| L121 | contains | SD1 → P4 |
| L122 | contains | SD1.1 → P5 |
| L123 | contains | SD1.1 → P6 |
| L124 | contains | SD1.1 → P7 |
| L125 | contains | SD1.1.1 → P8 |
| L126 | contains | SD1.1.1 → P9 |
| L127 | contains | SD1.1.1 → P10 |
| L128 | contains | SD1.1.1 → P11 |
| L129 | contains | SD1.1.2 → P12 |
| L130 | contains | SD1.1.2 → P13 |
| L131 | contains | SD1.1.2 → P14 |
| L132 | contains | SD1.1.2 → P15 |
| L133 | contains | SD1.1.2 → P16 |
| L134 | contains | SD1.1.2 → P17 |
| L135 | contains | SD1.1.2 → P18 |
| L136 | contains | SD1.1.2 → P19 |
| L137 | contains | SD1.1.2 → P20 |
| L138 | contains | SD1.1.2 → P21 |
| L139 | contains | SD1.1.2.1 → P22 |
| L140 | contains | SD1.1.2.1 → P23 |
| L141 | contains | SD1.1.2.1 → P24 |
| L142 | contains | SD1.1.2.1 → P25 |
| L143 | contains | SD1.1.2.1 → P26 |
| L144 | contains | SD1.1.2.1 → P27 |
| L145 | contains | SD1.1.2.1 → P28 |
| L146 | contains | SD1.1.2.1 → P29 |
| L147 | contains | SD1.2 → P30 |
| L148 | contains | SD1.2 → P31 |
| L149 | contains | SD1.2 → P32 |
| L150 | contains | SD1.2 → P33 |
| L151 | contains | SD1.2.1 → P34 |
| L152 | contains | SD1.2.1 → P35 |
| L153 | contains | SD1.2.1 → P36 |
| L154 | contains | SD1.2.1 → P37 |
| L155 | contains | SD1.2.1 → P38 |
| L156 | aggregation | O27 → O48 |
| L157 | aggregation | O27 → O52 |
| L158 | aggregation | O52 → O53 |
| L159 | aggregation | O52 → O56 |
| L160 | aggregation | O52 → O58 |
| L161 | aggregation | O51 → O54 |
| L162 | aggregation | O51 → O55 |
| L163 | aggregation | O51 → O57 |
| L164 | aggregation | O27 → O51 |
| L165 | aggregation | O28 → O23 |
| L166 | aggregation | O28 → O24 |
| L167 | aggregation | O28 → O25 |
| L168 | aggregation | O8 → O12 |
| L169 | aggregation | O8 → O13 |
| L170 | aggregation | O8 → O9 |
| L171 | aggregation | O8 → O10 |
| L172 | aggregation | O8 → O22 |
| L173 | aggregation | O11 → O14 |
| L174 | aggregation | O11 → O15 |
| L175 | aggregation | O11 → O16 |
| L176 | aggregation | O11 → O17 |
| L177 | aggregation | O11 → O19 |
| L178 | aggregation | O11 → O20 |
| L179 | aggregation | O11 → O18 |
| L180 | aggregation | O42 → O41 |
| L181 | aggregation | O42 → O40 |
| L182 | aggregation | O42 → O39 |
| L183 | exhibition | O5 → O49 |
| L184 | exhibition | O5 → O21 |
| L185 | exhibition | O5 → O7 |
| L186 | exhibition | O3 → O4 |
| L187 | exhibition | O2 → O4 |
| L188 | exhibition | O5 → O8 |
| L189 | exhibition | O5 → O11 |
| L190 | exhibition | O5 → O6 |
