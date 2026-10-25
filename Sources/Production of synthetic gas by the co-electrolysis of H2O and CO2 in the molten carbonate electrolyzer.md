---
title: "Production of synthetic gas by the co-electrolysis of H2O and CO2 in the molten carbonate electrolyzer"
source: "https://www.sciencedirect.com/science/article/pii/S0360319923015690?ref=pdf_download&fr=RR-2&rr=a503d371bff5b154"
author:
  - "[[molten carbonate fuel cell]]"
  - "[[Chakib]]"
published:
created: 2026-10-25
description: "The reversible operation of a commercialized molten carbonate fuel cell as an electrolyzer is attractive to store the surplus of renewable energy and …"
tags:
  - "clippings"
---
## Published by: Elsevier

### Published by

[![Elsevier](https://www.sciencedirect.com/us-east-1/prod/889670af36b5044091281d5e1d000b53155c5cd5/image/elsevier-non-solus.svg)](https://www.sciencedirect.com/journal/international-journal-of-hydrogen-energy "Go to International Journal of Hydrogen Energy on ScienceDirect")

## Production of synthetic gas by the co-electrolysis of H2O and CO2 in the molten carbonate electrolyzer

,

[View **PDF**](https://www.sciencedirect.com/science/article/pii/S0360319923015690/pdfft?md5=6fbd162cc64315adc57f19aacb8f36e8&pid=1-s2.0-S0360319923015690-main.pdf) [View Open Manuscript](https://www.sciencedirect.com/science/article/am/pii/S0360319923015690)

[10.1016/j.ijhydene.2023.03.402](https://doi.org/10.1016/j.ijhydene.2023.03.402)

## Highlights

## Keywords

Molten carbonate electrolysis cell

;

Numerical modeling

;

Co-electrolysis

;

Syngas production

- [Previous article in this issue](https://www.sciencedirect.com/science/article/pii/S0360319923012454)
- [Next article in this issue](https://www.sciencedirect.com/science/article/pii/S0360319923016671)

## Nomenclature

### Abbreviations

LHV

[Low Heating Value](https://www.sciencedirect.com/topics/engineering/low-heating-value)

MCEC

Molten Carbonate Electrolysis Cell

RWGS

Reverse Water Gas Shift

WGS

Water Gas Shift
### Greek letters

Δ *G* <sup>°</sup>

[Standard Gibbs Free Energy](https://www.sciencedirect.com/topics/engineering/standard-gibbs-free-energy) change of the reaction, kJ/mol

Δ *H*

[Enthalpy change](https://www.sciencedirect.com/topics/engineering/enthalpy-change) of a reaction at a specific temperature, kJ/mol

*η* <sub><em>MCEC</em></sub>

Efficiency of the MCEC system
### Variables

<sub><em>CH</em> 4<em>,prod</em></sub>

CH <sub>4</sub> [Mass Flow Rate](https://www.sciencedirect.com/topics/engineering/mass-flowrate) Produced, kg/h

<sub><em>in</em> (<em>i</em>)</sub>

Species i Inlet Molar Flow, kmol/h

<sub><em>out</em> (<em>i</em>)</sub>

Species i Outlet Molar Flow, kmol/h

<sub><em>reaction</em></sub>

[Heat of reactions](https://www.sciencedirect.com/topics/materials-science/heat-of-reaction): Electrolysis and the Reverse Water Gas Shift, kW

<sub><em>el,BOP</em></sub>

Balance of Plant Total Electrical Power, kW

<sub><em>el,MCEC</em></sub>

Cell Electrical Power, kW

*Cp,i*

Heat Capacity for each species at a specific temperature, J/mol.K

*n* <sub><em>e</em></sub>

Number of exchanged electrons

*Ncells*

Number of cells

*P* <sub><em>i</em></sub>

[Partial pressure](https://www.sciencedirect.com/topics/engineering/partial-pressure) of the species, kPa

*PCO* <sub>2</sub>*,fe*

Partial Pressure of CO <sub>2</sub> at the fuel electrode, kPa

*PCO* <sub>2</sub>*,oe*

Partial Pressure of CO <sub>2</sub> at the oxygen electrode, kPa

*Tcell*

Cell Temperature, K

*Tin*

Cell [Inlet Gases Temperature](https://www.sciencedirect.com/topics/engineering/inlet-gas-temperature), K

*Tout*

Cell Outlet Gases Temperature, K

*Vcell*

Cell Potential, V

*Vnernst*

Nernst Potential, V

*Vrev*

Reversible Potential, V

F

[Faraday's Constant](https://www.sciencedirect.com/topics/engineering/faradays-constant), (96,485 C/mol)

I

Current, A

j

Current Density, A/cm <sup>2</sup>

P°

Standard pressure (bar)

R

Gas Constant, J/mol.K

S

Cell active surface area, cm <sup>2</sup>

## Introduction

The European Union aims to achieve climate neutrality by 2050 and has committed to reducing net emissions by at least 55% by 2030 \[\]. This target could be reached by raising the share of renewable energy since energy production and consumption contribute to more than 75% of the EU's total greenhouse gas emissions. For this reason, the European Commission revised the [Renewable Energy Directive](https://www.sciencedirect.com/topics/engineering/renewable-energy-directive) in May 2022 and proposed increasing the renewable energy share's target from 32% in 2018 to 45% by 2030 \[\]. However, the massive introduction of renewable energies for [electricity generation](https://www.sciencedirect.com/topics/engineering/power-generation) planned for the middle of this century poses some problems related to the difficulty in balancing electricity production with the demand and the transmission and distribution of electricity responsible for managing the national electricity network due to its intermittence and fluctuation. Therefore, massive energy storage and a transmission and [distribution network](https://www.sciencedirect.com/topics/engineering/electric-power-distribution) are required to address the challenges of renewable energy.

[Energy storage systems](https://www.sciencedirect.com/topics/engineering/energy-storage-system) are currently being explored, developed, and implemented. Renewable energy may be stored in four ways: mechanically, electrically, thermally, or chemically. Each energy storage system's technology maturity level is divided into three categories: research and development, demonstration and deployment, and commercialization.

The energy storage system must meet the storage requirements, which are large storage capacity and long-term storage. Among all the storage techniques, chemical storage using a Power-to-Gas system proved to have a high storage capacity ranging between 100 GWh and 10 TWh and a long-term storage period \[\]. This system consists of an [electrolysis system](https://www.sciencedirect.com/topics/engineering/electrolysis-system), which uses renewable electric energy to split water into hydrogen, and a methane synthesis system, which combines the produced H <sub>2</sub> with the captured [CO](https://www.sciencedirect.com/topics/materials-science/carbon-monoxide) <sub>2</sub> to form methane gas. This method is now being implemented with low-temperature [electrolysis cells](https://www.sciencedirect.com/topics/engineering/electrolysis-cell): alkaline or proton membrane electrolyzers. On the other hand, High-temperature electrolysis has been demonstrated in studies to lower electrical demand while raising thermal needs \[\]. Therefore, there was an interest in studying high-temperature electrolysis using solid-oxide electrolyzers.

In this scope of interest, molten carbonate electrolysis cell (MCEC) emerged from the [MCFC](https://www.sciencedirect.com/topics/engineering/molten-carbonate-fuel-cell) technology as a novel system for power-to-gas application. This technology gains extreme interest due to the high development stage of MCFC technology, which is the only one that accounts for all [fuel cell technologies](https://www.sciencedirect.com/topics/engineering/fuel-cell-technology) \[\]. Its power plants are on the multimegawatt power scale. MCECs operate at 600–700 °C and are based on a molten carbonate electrolyte suspended in a porous and chemically inert matrix. The [hydrogen electrode](https://www.sciencedirect.com/topics/engineering/hydrogen-electrode) is coated by Nickel-based alloy with chromium and [aluminum](https://www.sciencedirect.com/topics/materials-science/aluminum) composition between 2 and 10% to reduce sintering and mechanical issues \[\]. The [oxygen electrode](https://www.sciencedirect.com/topics/engineering/oxygen-electrode) comprises NiO catalysts with lithium \[\]. The ability of its carbonate electrolyte to trap large amounts of CO <sub>2</sub> raises the possibility of reducing [carbon dioxide](https://www.sciencedirect.com/topics/chemical-engineering/carbon-dioxide) within it to generate [syngas](https://www.sciencedirect.com/topics/engineering/syngas) (H <sub>2</sub> & CO) through a co-electrolysis process. The co-electrolysis of CO <sub>2</sub> and H <sub>2</sub> O in molten carbonate electrolysis cells is being examined to establish the molten carbonates’ capacity to [electrolyze](https://www.sciencedirect.com/topics/engineering/electrolyzer) CO <sub>2</sub> into CO.

Some research studies were carried out to study the electrochemical conversion of CO <sub>2</sub> into CO in the molten carbonate electrolyzer. For example, Peelen et al., 1997 \[\] explored the [electrochemical reduction](https://www.sciencedirect.com/topics/materials-science/electrochemical-reaction) of CO <sub>2</sub> into CO on a flag electrode of gold material in 62/38 mol % of Li/K carbonate mixture at temperatures ranging from 575 to 700 °C. Likewise, Kaplan et al. (2010,2012) \[,\] declared the conversion of CO <sub>2</sub> to CO in a cell based on an electrolyte mixture of Li <sub>2</sub> CO <sub>3</sub> /Li <sub>2</sub> O, and working at temperatures of 850–900 °C, significantly higher than the operating temperature of the MCFC. The cell's anode electrodes were graphite, and the cathode ones were titanium, which differed from conventional MCFC electrodes based on Nickel (Ni) materials. These studies demonstrated the electrochemical CO <sub>2</sub> conversion using flag electrodes rather than the Ni-based conventional MCFC electrodes. Lately, Meskine et al., 2020 \[\] have affirmed the electrochemical production of CO via CO <sub>2</sub> electrolysis using conventional MCFC electrode materials. Nevertheless, their study poses a limited operation cell potential of 1.4 V for avoiding the production of [carbon deposit](https://www.sciencedirect.com/topics/engineering/carbon-deposit) (C) rather than CO, thus damaging the cell. Although all the research studies have verified the occurrence of the CO <sub>2</sub> electrolysis inside the molten carbonate electrolysis cell, it is not yet considered in any developed MCEC model.

All models have assumed that carbon monoxide (CO) is only generated chemically via the reverse [water gas shift](https://www.sciencedirect.com/topics/engineering/water-gas-shift). Hu L., 2014 \[\] was the first to develop a model for the reversible operation of a Molten Carbonate Fuel Cell. His model considers the reversible shift of the reactions that occur in the MCFC and the chemical production of CO by reverse [water gas shift](https://www.sciencedirect.com/topics/chemical-engineering/water-gas-shift). However, the CO <sub>2</sub> electrolysis was neglected for kinetic reasons, as stated in his work. Later, Reyes-Belmonte et al., 2017 \[\] proposed a model to investigate the effects of the operating conditions on the MCEC performance. In their model, they employed only the electrochemical reactions for only producing H <sub>2</sub>. Besides, Mastropasqua et al., 2018 \[\] simulated the reversible operation of the molten carbonate fuel cell by developing a model that took into account the chemical production of CO inside the cell. Recently, Pérez-Trujillo et al., 2020 \[\] and Barelli et al., 2020 \[\] investigated the cell's performance using a numerical model that assumes CO generation by reverse water gas shift. Also, Ferrario et al., 2021 \[\] conducted an experimental-simulative technique to investigate the integration of a system of the MCEC unit under varied operating circumstances in a steam-reforming process of an Italian oil refinery. They developed the mass balance of their model based on the electrochemical reaction for [hydrogen generation](https://www.sciencedirect.com/topics/engineering/hydrogen-generation) and the chemical reaction for CO creation. In this work, a model is developed to cover both H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis for [syngas production](https://www.sciencedirect.com/topics/engineering/syngas-generation) in the MCEC.

This research presents a co-electrolysis model based on electrochemical knowledge and material and energy balances built within [Aspen Custom Modeler](https://www.sciencedirect.com/topics/engineering/aspen-custom-modeler) (ACM). This model was applied to two different scenarios. The first model (Scenario I) is composed of the electrolysis of H <sub>2</sub> O, which is the source of H <sub>2</sub> production, and the chemical reaction “Reverse Water Gas Shift (RWGS)," which is the source of CO production. This model was presented in a previous paper \[\]. However, in the second model (Scenario II), which will be presented in this paper, the H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis was considered to produce H <sub>2</sub> and CO in parallel with the chemical reaction “RWGS”. The main target of the model is to determine the outlet temperature of the molten carbonate electrolysis cell and the cell potential, taking into account the over-potential losses. So, this work aims at evaluating the co-electrolysis of CO <sub>2</sub> and H <sub>2</sub> O compared to the standard H <sub>2</sub> O electrolysis. Finally, the [technical feasibility](https://www.sciencedirect.com/topics/engineering/technical-feasibility) of a 1 MW power-to-gas system based on the MCEC electrolyzer's co-electrolysis model is investigated.

## Theory

The process of splitting water into hydrogen and oxygen using electricity is known as electrolysis. This reaction takes place in a device known as an [electrolyzer](https://www.sciencedirect.com/topics/engineering/electrolyzer). Electrolyzers, like fuel cells, are made up of an anode and a cathode separated by an electrolyte. Different electrolyzers work differently according to the various electrolyte materials used and the ionic species they conduct. For example, in the molten carbonate [electrolysis cell](https://www.sciencedirect.com/topics/engineering/electrolysis-cell), H <sub>2</sub> O is reduced into H <sub>2</sub> at the cathode electrode side with the aid of [CO](https://www.sciencedirect.com/topics/materials-science/carbon-monoxide) <sub>2</sub> that is required to generate the [carbonate ion](https://www.sciencedirect.com/topics/engineering/carbonate-ion) environment, as presented in Eq.. The carbonate ions CO <sub>3</sub> <sup>2−</sup> are then carried through the electrolyte and oxidized at the anode electrode side, as described in Eq..(1)(2)

The equations given above are the standard ones for H <sub>2</sub> O electrolysis. As previously presented in the literature, a recent study has been conducted on the possibility of electrochemical conversion of CO <sub>2</sub> into CO using the reaction (Eq. ). Thus, the overall redox equation of the H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis can be written as presented in Eq..(3)(4)

Moreover, carbon monoxide can be chemically produced via Reverse [Water Gas Shift](https://www.sciencedirect.com/topics/engineering/water-gas-shift) RWGS (Eq. ) due to the presence of CO <sub>2</sub> and H <sub>2</sub> at the Ni-electrode interface, where the operating temperature of 650 °C and Ni-catalyst favor the [RWGS reaction](https://www.sciencedirect.com/topics/engineering/water-gas-shift-reaction) thermodynamically.(5)

## Model development

In the standard model, the H <sub>2</sub> O electrolysis is the only occurring [electrochemical reaction](https://www.sciencedirect.com/topics/materials-science/electrochemical-reaction). This means that the applied current is utilized to produce H <sub>2</sub>. Thus, according to Faraday's Law, the amount of H <sub>2</sub> produced by H <sub>2</sub> O electrolysis can be calculated using Eq. by dividing the applied current, corresponding to the multiple of the applied current density (*j*) and the electrode's active surface area (*S*), by the multiple of the exchanged number of electrons () with the [Faraday's constant](https://www.sciencedirect.com/topics/engineering/faradays-constant) ().(6)

In our case, the model considers both H <sub>2</sub> O and CO <sub>2</sub> electrolysis. Therefore, it is assumed that the global current density can be split between H <sub>2</sub> O and CO <sub>2</sub> electrolysis using the following equations \[\]: Eq. and Eq..(7)(8)

The parameter refers to the repartition of the electrode active sites between both electrochemical reactions \[\]. It can be expressed by the relative percentage of inlet H <sub>2</sub> O (*)* and CO <sub>2</sub> () at the electrode interface (Eq. ).(9)

### Material balance

A material balance is performed at the exit of the fuel and [oxygen electrodes](https://www.sciencedirect.com/topics/engineering/oxygen-electrode), aiming to determine the [molar quantity](https://www.sciencedirect.com/topics/engineering/molar-quantity) of species formed from the reactions. This balance requires the amount of the H <sub>2</sub> O reacted electrochemically (), and that of CO <sub>2</sub> () at the fuel electrode, that are calculated using Faraday's Law equation. Based on the current split assumption, and can be calculated according to Eq. and Eq., respectively. On the other hand, the molar flow of the reacted CO <sub>2</sub> by the chemical reaction (RWGS) is calculated from the [equilibrium constant](https://www.sciencedirect.com/topics/engineering/equilibrium-constant), which is a function of temperature and the [partial pressures](https://www.sciencedirect.com/topics/engineering/partial-pressure) of the species at equilibrium, by applying the formula presented in Ref. \[\].(10)(11)

The above equations depend on the current density (A/cm <sup>2</sup>), electrode active area (cm <sup>2</sup>), Faraday's constant (C/mol), and the number of electrons involved in the reaction .

According to the [stoichiometric coefficient](https://www.sciencedirect.com/topics/engineering/stoichiometric-coefficient) of the co-electrolysis reaction Eq., [carbon dioxide](https://www.sciencedirect.com/topics/materials-science/carbon-dioxide) CO <sub>2</sub> is the [limiting reactant](https://www.sciencedirect.com/topics/engineering/limiting-reactant), meaning it is the first to be consumed. At these conditions, the reactions are entirely halted due to reactant by-product blockage at the [electrode surface](https://www.sciencedirect.com/topics/engineering/electrode-surface), and the corresponding current density is called “limiting current density” \[\]. The [limiting current density](https://www.sciencedirect.com/topics/engineering/limiting-current-density) is calculated using Eq..(12)

### Electrochemical model

The electrochemical model is performed to determine the cell potential and power. The cell potential comprises the Nernst () voltage and the cell's internal resistance. The developed model in Monzer et al., 2021 \[\] has been modified to account for co-electrolysis. The cell potential equation remains unchanged, but the Nernst voltage and reversible voltage () are adjusted to account for the CO <sub>2</sub> electrolysis, as shown in Eq. and Eq., respectively.(13)(14)

The electric power consumed by the electrolyzer is calculated using Eq..(15)

### Energy balance

A heat balance must be performed for the model to be complete (Eq. ). From this heat balance, the outlet temperature of the cell on both sides can be calculated.(16)

In the above equation, the heat capacity ( (kJ/mol.K)) is calculated using data from NIST Webbook \[\] at the average temperature () between the [inlet temperature](https://www.sciencedirect.com/topics/engineering/inlet-temperature) of the cell () and the cell temperature (). As for the , it represents the [heat of reactions](https://www.sciencedirect.com/topics/materials-science/heat-of-reaction) occurring in the cell and is calculated according to the equation Eq. 17. The heat of reactions required for H <sub>2</sub> O electrolysis consists of the amount of H <sub>2</sub> produced () during the process and the [water electrolysis](https://www.sciencedirect.com/topics/engineering/water-electrolysis) heat [enthalpy's change](https://www.sciencedirect.com/topics/engineering/enthalpy-change) (). In the case of CO <sub>2</sub> electrolysis, it is a function of the amount of CO produced and the change in heat enthalpy (). For the reverse [water gas shift reaction](https://www.sciencedirect.com/topics/engineering/water-gas-shift-reaction), the reaction heat is determined by the amount of CO produced () and the heat enthalpy's change ().(17)

### Model conditions and assumptions

The model was evaluated based on the experimental conditions applied at the “Ecole Nationale de la Chimie de Paris” \[\]. The laboratory testing electrolysis cell is a single-cell set-up with an electrode surface area of 3.14 cm <sup>2</sup>, developed with the aid of Fiaxell® testing systems. It includes the stack electrodes (fuel electrode Ni and oxygen electrode NiO, 2.1 cm diameter and respectively 0.08 cm and 0.069 cm thickness), electrolytic matrix (*γ* -LiAlO <sub>2</sub>, 3.6 cm diameter and 0.05 cm total thickness), and electrolyte (Li–K 62:38 mol%, 3.6 cm diameter and 1.8 mm total thickness). The cell operates at 650 °C and atmospheric pressure. The fuel electrode of the cell is fed by a [gas mixture](https://www.sciencedirect.com/topics/engineering/gas-mixture) of 64% H <sub>2</sub>, 20% H <sub>2</sub> O, and 16% CO <sub>2</sub>, while the oxygen electrode's [inlet gas](https://www.sciencedirect.com/topics/engineering/inlet-gas) composition is 30% CO <sub>2</sub>, 15% O <sub>2</sub>, and 55% N <sub>2</sub>.

Within the model build-up, the following assumptions were considered.
- •
	The equilibrium reverse of the RWGS reactions is not considered, where it is assumed that the equilibrium constant K is zero.
- •
	When the applied current density is greater than the limiting current density, the calculations are performed at the limiting current density conditions.
- •
	The possible reactions that may occur within the [bipolar plates](https://www.sciencedirect.com/topics/engineering/bipolar-plate) are not considered.
- •
	The [methanation](https://www.sciencedirect.com/topics/engineering/methanation) reaction inside the cell is not considered in this study because the cell's inlet conditions don't meet the ones required to promote methane production.

## Results and discussion

### Model results

The main conceptual difference between the two scenarios is the CO <sub>2</sub> electrolysis inside the cell (see ). The presence of CO <sub>2</sub> electrolysis inside the cell has changed its mass and energy balance and the electrochemical model. In this work, an analysis was performed for Scenario II to investigate the impact of the current density on the cell potential, the cell's [outlet composition](https://www.sciencedirect.com/topics/engineering/outlet-composition), and the [cell's stream](https://www.sciencedirect.com/topics/engineering/stream-cell) outlet temperature. The outcomes of this investigation are further compared with that of Scenario I.

Table 1. The conditions of the two different scenarios.

| Empty Cell | H <sub>2</sub> O electrolysis | CO <sub>2</sub> electrolysis | RWGS |
| --- | --- | --- | --- |
| Scenario I | YES | NO | YES |
| Scenario II | YES | YES | YES |

#### The trend of outlet gas composition with the current density

The outlet composition of the gases, mainly H <sub>2</sub> O, CO <sub>2</sub>, H <sub>2</sub>, and CO, change with the current density is illustrated in (a) for Scenario I and (b) for Scenario II. Both graphs demonstrate that the outlet H <sub>2</sub> gas composition (gray dotted line) increases while the outlet H <sub>2</sub> O gas composition (yellow dotted line) decreases, indicating that water is involved in [hydrogen production](https://www.sciencedirect.com/topics/engineering/hydrogen-production). However, at [high current densities](https://www.sciencedirect.com/topics/engineering/high-current-density), the outlet CO gas composition (orange-solid line) and the outlet CO <sub>2</sub> gas composition (blue-solid line) differ from Scenarios I to Scenario II. The intervention of CO <sub>2</sub> electrolysis can typically explain this difference. In Scenario I, CO and CO <sub>2</sub> gas compositions decrease with the increase in the current density. This result can be presented according to the dominance between the RWGS and electrochemical reactions. As the current density increases, the electrochemical reaction takes precedence over the RWGS chemical reaction, resulting in a reduction in CO produced by the RWGS reaction because H <sub>2</sub> O electrolysis consumes carbon dioxide rather than RWGS. On the other hand, in Scenarios II, the outlet CO gas composition (orange-solid line) declines with the increase in current density with the same trend as that in (a). However, at a specific current density of −0.2 A/cm <sup>2</sup>, which is the dip point, the curve change where the CO composition increases with the current density to become stable at the end. Parallel to this, the outlet CO <sub>2</sub> gas composition, represented by the blue-solid line, considerably decreases and then rapidly starts to fall at a current density of −0.2 A/cm <sup>2</sup> to reach zero at the end.

![Fig. 1](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr1.jpg)

Download: Download high-res image (400KB)

The reason for this divergence in these curves is better explained in, which illustrates how the outlet CO composition trend is linked to the evolution of the CO <sub>2</sub> electrolysis and RWGS processes. This curve may be used to derive two distinct origins that define the cause of the variance. The first origin is related to the condition in which the RWGS equilibrium is not attained, indicating that the RWGS reaction is not taking place inside the cell. For example, reveals that at a current density of −0.2 A/cm <sup>2</sup>, the mole of CO generated by RWGS is zero, implying that RWGS does not occur. At this point, the CO <sub>2</sub> electrolysis process yields CO solely. This situation leads to a divergent increase in the outlet CO trend, which follows the increasing trend of CO <sub>2</sub> electrolysis. The second origin is the point at which the [limiting current density](https://www.sciencedirect.com/topics/engineering/limiting-current-density) is achieved, and all CO <sub>2</sub> is consumed. In (b), the CO <sub>2</sub> composition curve shows that after a given current density (−0.23 A/cm <sup>2</sup>), the output CO <sub>2</sub> composition reaches zero, meaning that the CO <sub>2</sub> has been entirely consumed. At this point, the cell is operating at the limiting current density of −0.23 A/cm <sup>2</sup>, and it cannot work at a current density above this. As a result, the curve becomes steady. This restriction is applied to the model to avoid exceeding the limiting current density. Therefore, it was assumed that if the operating current density is more than the calculated limited current density, the model will use the latter.

![Fig. 2](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr2.jpg)

Download: Download high-res image (174KB)

#### Sensitivity analysis on CO gas composition: limiting current density

To better evaluate the co-electrolysis of H <sub>2</sub> O and CO <sub>2</sub>, a sensitivity study was performed on the deviation of the CO outlet gas composition with the [inlet gas](https://www.sciencedirect.com/topics/engineering/inlet-gas) composition of the cell. As was reported in the previous paper \[\], part of the outlet gas of the cell's fuel electrode is being recycled to the cell for thermal management reasons and the obligation of having a quantity of H <sub>2</sub> in the inlet feed stream for electrode stability \[\]. The recycled stream contains CO apart from H <sub>2</sub>, H <sub>2</sub> O, and CO <sub>2</sub>. For this reason, it was necessary to have an overview of the impact of the inlet CO on the point of deviation presented in.

In this study, three cases of the fuel electrode's inlet gas compositions are evaluated, shown in detail in.

Table 2. Cell's inlet gas compositions of the three studied cases.

| Empty Cell | H <sub>2</sub> O | CO <sub>2</sub> | H <sub>2</sub> | CO |
| --- | --- | --- | --- | --- |
| Case I | 52% | 40% | 8% | 0% |
| Case II | 52% | 40% | 7.14% | 0.86% |
| Case III | 52% | 40% | 6% | 2% |

From this study, it can be highlighted the evolution of the total CO outlet composition, illustrated in (a), and the CO flow rate produced from RWGS, represented in (b). These results offer a clear insight into the deviation's changing point explained in. Furthermore, from (a), it can be revealed that the curve deviates at [lower current densities](https://www.sciencedirect.com/topics/engineering/low-current-density) with the increase in the inlet CO composition. For example, in Case I, where there is no inlet CO to the cell, the curve has an optimum point at a current density of −0.12 A/cm <sup>2</sup> and reaches a steady state at a limiting current density of −0.15 A/cm <sup>2</sup>. On the contrary, in Case III, where the inlet gas contains 2% CO, the curve's optimum is obtained at a current density of −0.02 A/cm <sup>2</sup> and the limiting current density of −0.11 A/cm <sup>2</sup>.

![Fig. 3](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr3.jpg)

Download: Download high-res image (200KB)

The optimum point reveals that the RWGS reaction is not occurring at the electrode's interface. This observation may be demonstrated by examining the CO flow rate produced by RWGS in (b), where at the optimum point in (a), the CO flow rate becomes zero. After this point, the CO outlet composition increases due to the CO <sub>2</sub> electrolysis to CO.

Furthermore, it can be noticed that the gap between the optimum point and the steady state one is broader in Case III at 2% CO [inlet composition](https://www.sciencedirect.com/topics/engineering/inlet-composition) compared to other cases, which means that the CO production electrochemically is enhanced at a lower current density with the increase in CO inlet composition. However, this analysis could be altered if the equilibrium shift of RWGS is reversed after the optimum point, which could cause CO consumption by WGS reaction. Finally, based on this model's study, it can be revealed that the input gas composition alters the deviation in the CO and CO <sub>2</sub> outlet gas compositions due to the change in the RWGS equilibrium and the limiting current density in the function of these compositions.

#### The trend of cell potential and temperature with the current potential

Apart from the mass balance results, the cell potential and gas outlet temperature evolution were examined between the two scenarios. Since there is a link between the cell potential and the outlet gases within the Nernst equation, it is expected to be affected similarly to the gas composition in Scenario II. The cell potential evolution with the current density is comparable between Scenarios I and II till reaching the point of deviation explained previously. As shown in, this circumstance results in a sharp increase in cell potential once approaching the limiting current density since the low CO <sub>2</sub> reacting agent caused higher concentration losses, thus higher overpotentials. On the other hand, the outlet gas temperature is also influenced by its composition when applying the energy balance. So, by comparing the results of Scenario I in (a) with that of Scenario II in (b), it can be noticed that the temperature is similar till reaching the breakeven point of a current density of −0.19 A/cm <sup>2</sup>. However, the curve trend slightly deviates to higher temperatures in Scenario II after this point, then sharply increases from 850 °C (−0.225 A/cm <sup>2</sup>) to 1060 °C (−0.25 A/cm <sup>2</sup>) when approaching the limiting current density, as depicted in (b). This observation can be seen when comparing the cell potential and the temperature levels between both Scenarios. For example, at −0.225 A/cm <sup>2</sup>, the temperature is 850 °C, and the cell potential is 2.1 V in Scenario II. However, this point refers to a temperature of around 750 °C and a cell potential of 1.7 V in Scenario I.

![Fig. 4](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr4.jpg)

Download: Download high-res image (184KB)

![Fig. 5](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr5.jpg)

Download: Download high-res image (303KB)

The cell potential and temperature outcomes at the state of the limiting current density were also obtained by A. Szczesniak et al., 2020 \[\] in their analysis of the effects of various malfunctions on the performance of the [molten carbonate fuel cell](https://www.sciencedirect.com/topics/engineering/molten-carbonate-fuel-cell). They reported that low [feed gas flow](https://www.sciencedirect.com/topics/engineering/feed-gas-flow), one of the studied malfunctions, causes a decrease in [cell voltage](https://www.sciencedirect.com/topics/engineering/cell-voltage) and a considerable growth in cell temperature while operating in fuel cell mode. However, in the electrolysis mode, it can be figured out that this malfunction will cause a sharp increase in cell potential and temperature. In conclusion, these findings reveal the importance of considering the CO <sub>2</sub> electrolysis in the cell since it affects its operating conditions, thus causing its damage if no precautions are taken.

Generally, both models are comparative to some extent, just before the point of divergence caused by the co-electrolysis state. Two aspects can explain this similarity. The first is that both models have the exact total applied current density. However, this current is solely used for H <sub>2</sub> O electrolysis in Scenario I; whereas in Scenario II, it is divided between H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis. The second is the equilibrium balance of the reverse water gas shift reaction with the CO <sub>2</sub> electrolysis reaction, which yields a similar gas composition at the beginning in both models. These findings were obtained by ANR partner Chimie ParisTech \[\] using a thermodynamic simulation with a current density ranging from 0 to −0.2 A/cm <sup>2</sup>. Their findings concluded that both H <sub>2</sub> O electrolysis and H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis produce the same outlet results. Besides, the outlet CO composition represented by the black curve in is analogous to the percentages obtained by the ANR partner Chimie ParisTech's work \[\]. Finally, it should be noted that the model was validated with their experimental data and other work data presented in the previous [research work](https://www.sciencedirect.com/topics/engineering/research-work) \[\].

### Simulation of the 1 MW power to gas system

#### Process overview

The power-to-gas system comprises two essential sub-processes representing the system's heart. First comes the electrolysis process, which is responsible for providing the raw material for methane production, mainly hydrogen. The produced hydrogen is then combined with a CO <sub>2</sub> source to pass to another part of the process: [methanation](https://www.sciencedirect.com/topics/engineering/methanation). This process is conventional for the power-to-gas system. The commercially available electrolyzers (Alkaline and [Proton Exchange Membranes](https://www.sciencedirect.com/topics/engineering/proton-exchange-membrane) electrolyzers) produce only hydrogen. However, in the MCEC technology, both H <sub>2</sub> O and CO <sub>2</sub> are needed for cell operation. Therefore, these gases undergo co-electrolysis to form synthetic gases H <sub>2</sub> and CO. This mixture corresponds to the intermediate stage of Sabatier CO <sub>2</sub> methanation and may thus be easily converted into methane. In this study, the process was simulated in Aspen Plus software and used the model built in [Aspen Custom Modeler](https://www.sciencedirect.com/topics/engineering/aspen-custom-modeler). The principle concept of the process was presented in Ref. \[\], where each part is explained in detail. However, in this paper, some modifications were performed after adding the concept of co-electrolysis to the model, which wasn't considered previously.

By referring to the simulation in Ref. \[\], this work presents its novel version where the Power-to-gas process is based on the MCEC co-electrolysis model and is scaled up from 250 kW to 1 MW. In this part, a sensitivity analysis was conducted to select the optimal conditions for the best process efficiency. Additionally, a pinch study with a [heat exchanger network](https://www.sciencedirect.com/topics/engineering/heat-exchanger-network) is carried out.

#### Process optimization

The co-electrolysis process poses a series of restrictions due to the limiting current density. As mentioned previously, the limiting current density changes with the inlet composition of the cell. As a consequence, the outlet gas compositions are altered. Since the target of the process is to produce a methane gas that meets the requirements of the [natural gas network](https://www.sciencedirect.com/topics/engineering/natural-gas-network), the operating conditions of the process have to be carefully selected. For this purpose, a profound sensitivity analysis is performed by developing an [Excel VBA](https://www.sciencedirect.com/topics/chemical-engineering/microsoft-excel-vba) code linked to the Aspen Plus simulation.

The sensitivity analysis compromises the key variables, the outputs, and the constraints on the outcomes. The key variables are the cell's [inlet temperature](https://www.sciencedirect.com/topics/engineering/inlet-temperature), operating pressure, the water and CO <sub>2</sub> [inlet flow rates](https://www.sciencedirect.com/topics/engineering/inlet-flowrate), and the current density. The margin of change of critical variables is fixed based on several constraints and parameters. First, the cell's inlet temperature is varied between 500 °C and 750 °C to ensure the full coverage of the melting point temperature of all the molten carbonate mixtures of the electrolyte. Second, the range of the cell's operating pressure is fixed between 1.013 bar and 6 bar since, from the thermodynamic approach, the cell voltage increases with pressure, which is not recommended. Third, the water and CO <sub>2</sub> inlet flow rates are chosen to vary between 5 and 15 kmol/h. This range was chosen arbitrarily because the most crucial factor is the composition ratio of H <sub>2</sub> O and CO <sub>2</sub> at the fuel electrode side, which is also influenced by the split fraction of CO <sub>2</sub> flow between both electrodes and the recycling ratio of the fuel electrode's outflow to its inlet. Finally, the current density is varied between −0.04 and −0.16 A/cm <sup>2</sup>, where a limit of −0.16 A/cm <sup>2</sup> is put due to the increase of cell potential with the current density, which can cause the cell's melt. It must be noted that these margins were applied on a simulation where the MCEC consists of 213 cells.

The outputs are those related to the performance of the electrolysis and methanation processes. They include the cell's voltage, outlet temperature, the total electrical energy consumed by the cell per methane gas produced (E <sub><em>elec</em></sub> /m <sub><em>CH</em> 4</sub>), and the final methane composition (Y <sup>f</sup> <sub>CH4</sub>). Before selecting the optimal inputs, it is essential to understand the impact of each input parameter on the outlet one. First, starting with the current density, its impact on the cell's outlet temperature, voltage, outlet methane composition, and the cell's energy per methane gas produced is presented in. This study was conducted at a fixed value of inlet temperature of 650 °C, the pressure of 1.013 bar, inlet H <sub>2</sub> O and CO <sub>2</sub> flow rate of 5 kmol/h and 7 kmol/h, respectively, a CO <sub>2</sub> split fraction of 0.5, and recycling ratio of 0.2. From (a), it can be seen that the temperature decreases with the increase negatively in current density to reach an optimum at −0.06 A/cm <sup>2</sup>, then increases progressively with the current density. At the fixed parameters' conditions, the cell is observed operating in the endothermic state; however, this state changes when changing the rest of the parameters. As for the cell's voltage ((b)), it increases with the current density, as expected. Since the system is a power-to-gas process, it is essential to look at the outlet methane composition (Y <sup>f</sup> <sub>CH4</sub>), depicted in (c). The results show that the current density affects the outlet methane composition, which increases with the current density. Finally, there are the outcomes of the electrical energy required per mass-produced CH <sub>4</sub>, presented in (d), which gives a premier vision of the process efficiency. From these results, it can be deduced that this ratio slightly increases with the current density, implying that the process efficiency may be lowered somewhat.

![Fig. 6](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr6.jpg)

Download: Download high-res image (366KB)

Second, the effect of the inlet CO <sub>2</sub> flow rate on the previously mentioned outcome parameters is evaluated and illustrated in. In this case, the fixed input conditions are selected to be the current density at a value of −0.1 A/cm <sup>2</sup>. The other values are similar to the previous case, where the variable parameter is the inlet CO <sub>2</sub> flow rate. The results presented here start with a CO <sub>2</sub> flow rate of 7 kmol/h, not 5 kmol/h since some errors were generated during the aspen simulation, causing some limitations to be added to the VBA code excel to skip the input values that produce these problems. In (a), the cell's outlet temperature decreases rapidly when the CO <sub>2</sub> flow rate increases from 7 to 9 kmol/h, then it gradually decreases to become stable at higher flow rates.

![Fig. 7](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr7.jpg)

Download: Download high-res image (335KB)

Furthermore, the cell voltage is reversibly affected by the CO <sub>2</sub> flow rate increase, where it decreases with the CO <sub>2</sub> flow rate ((b)). This finding is considered a good point from the cell's performance perspective. On the contrary, the produced methane composition is diminished with the increase of CO <sub>2</sub> flow rate. The obtained result can be well explained by the fact that there would be an excess CO <sub>2</sub> in the syn gas entering the methanation process. This circumstance will cause the syn gas ratio to shift from its optimal, thus leading to a possible generation of [carbon deposit](https://www.sciencedirect.com/topics/engineering/carbon-deposit) in the methanation reactor \[\]. On the other hand, the electrical energy per kg of CH <sub>4</sub> produced decreases with CO <sub>2</sub> flow rate till reaching an optimum with 11 kmol/h CO <sub>2</sub> flow rate, then re-increases. From this outcome, it can be deduced that the CO <sub>2</sub> flow rate choice is a compromise between the final CH <sub>4</sub> composition and the electrical energy consumed by the electrolyzer, which is an essential parameter for process efficiency.

Third, similar to CO <sub>2</sub>, the H <sub>2</sub> O flow rate impact on the chosen outcome parameters is also investigated, and the results are depicted in. Here, the CO <sub>2</sub> inlet flow rate is set at 7 kmol/h, and that of H <sub>2</sub> O is varied. The first parameter to look at is the cell's outlet temperature in (a), where the outcomes demonstrate a rapid temperature drop between 5 and 7 kmol/h of H <sub>2</sub> O. After that, the temperature gradually increases with H <sub>2</sub> O flow rate. However, it remains below the temperature obtained at 5 kmol/h. The higher temperature at 5 kmol/h is related to the low [gas flow](https://www.sciencedirect.com/topics/engineering/gas-flow) into the cell, leading to an increase in temperature based on the thermodynamics principle. In addition, the increase in H <sub>2</sub> O flow rate positively impacts cell voltage ((b)) that decreases with the H <sub>2</sub> O flow rate. The same is observed for the outlet methane composition in (c), where it increases linearly when more H <sub>2</sub> O enters the cell. Finally, the process efficiency is enhanced with the increase in H <sub>2</sub> O flow rate, which can be seen by the decrease in the electrical energy consumed per kg of CH <sub>4</sub> produced in (d).

![Fig. 8](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr8.jpg)

Download: Download high-res image (357KB)

In addition to the H <sub>2</sub> O and CO <sub>2</sub> flow rate variation, the CO <sub>2</sub> split fraction between the electrodes (r <sub><em>CO</em> 2 <em>split</em></sub>) and the recycling ratio (R <sub><em>outcathode</em></sub>) of the fuel electrode's outflow to its inlet were studied, where these four parameters determine the cell's inlet composition. The study's outcomes are presented in, where the x-axis presents the recycling ratios studied, and the legend shows the different CO <sub>2</sub> split fractions. For more comprehension, increasing the CO <sub>2</sub> split fractions signifies that more CO <sub>2</sub> enters the fuel electrode where co-electrolysis occurs, indicating that it follows the same concept as increasing the CO <sub>2</sub> flow rate. Likewise, the recycling ratio increase implies that additional H <sub>2</sub> O, CO <sub>2</sub> enters the fuel electrode. Therefore, by analyzing (a), it is apparent that the temperature increases with the recycling ratio regardless of the CO <sub>2</sub> split fraction, except for a split fraction of 0.5, where the temperature declines with the recycling ratio. From the CO <sub>2</sub> split fraction side, the temperature decreases when the fraction increases, mainly above 0.6, regardless of the recycling ratio. However, it cannot be similarly reported for the 0.4 and 0.5 fractions. Even though the temperature at the 0.5 CO <sub>2</sub> split fraction drops with the recycling rate, it stays higher than the temperature at the 0.4 fractions when the recycling ratio is less than 0.4. After that, both CO <sub>2</sub> fractions 0.4 and 0.5 show the same temperature at 0.4 recycling ratio, and then they reverse directions, with 0.4 CO <sub>2</sub> fractions providing a higher temperature than 0.5.

![Fig. 9](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr9.jpg)

Download: Download high-res image (495KB)

Regarding the cell potential in (b), the fluctuation in the outcomes at 0.4 and 0.5 CO <sub>2</sub> fractions can be similarly observed. Whereas, for CO <sub>2</sub> fraction above 0.5, the cell potential decreases while increasing the split fraction, whatever the recycling ratio is. Moreover, for split fractions above 0.5, the cell potential remains relatively constant while the recycling ratio changes. On the contrary, it cannot be stated similarly for split fractions 0.4 and 0.5 because the cell voltage increases with the recycling ratio at 0.4 split fractions and decreases with it at 0.5 split fractions. The results of the methane composition in (c) and the electrical energy per kilogram of CH <sub>4</sub> produced in (d) differ somehow from the previous ones. At all recycle ratios studied, the methane composition decreases as the CO <sub>2</sub> split fraction increases. It does not, however, vary with the recycling ratio, except for a split fraction of 0.4, where it increases until reaching a recycling ratio of 0.4, then drops at a recycling ratio of 0.5. On the other hand, the electrical energy per kg of CH <sub>4</sub> produced decreases while increasing the recycling ratio and the CO <sub>2</sub> split fraction above 0.4; whereas, for 0.4 split fractions, it stays constant with the recycling ratio till a value of 0.4, and then rapidly increases at a recycling ratio of 0.5. Because there are various factors to consider, explaining this fluctuation is complicated. However, it can be deduced that the deficient composition of CO <sub>2</sub> in the feed significantly influences the outlet gas temperature and, consequently, the cell temperature, potential, and power.

Finally, the impact of the [inlet gas temperature](https://www.sciencedirect.com/topics/engineering/inlet-gas-temperature) and pressure is assessed to cover all possible factors impacting the power-to-gas system's efficiency. depicts the variation of the outlet gas temperature, cell's voltage, energy per kg of CH <sub>4</sub> produced, and the methane composition as a function of the temperature and pressure. To study these factors, the model required adjusting the thermodynamic parameters' equations, like enthalpy, entropy, and heat capacity, to include their variation with temperature and pressure. The equations as a function of temperature were taken from NIST Webbook \[\]; however, that of pressure were generated through profound calculations of data extracted from [Aspen Properties](https://www.sciencedirect.com/topics/engineering/aspen-properties). Looking at the results, (a) reveals that the outlet gas temperature increases with the increase in the inlet temperature and pressure. The same is applicable for the cell potential in (b), signifying that the inlet gas temperature and pressure have the same influence on the outlet gas temperature and the cell voltages. As viewed in (c), the methane composition is affected only by the [inlet pressure](https://www.sciencedirect.com/topics/engineering/inlet-pressure), as it increases with the pressure. Two reasons can explain this observation. The first reason is that, at the cell's fixed conditions selected here, the RWGS reaction is not occurring, as described in. Thus, based on thermodynamics and chemical principles, temperature and pressure do not impact the outlet composition. This case explains the obtained constant value of methane composition with the temperature change. The second reason is related to the change of methane composition with pressure, which, based on the first reason, must not change. This change is due to the effect of pressure on the water separation from the syn gas before methanation, where water separation is enhanced with the pressure increase. Therefore, the final syn gas contains less water, which favors methane production, according to [Le Chatelier's](https://www.sciencedirect.com/topics/engineering/le-chatelier) principle, so the methane composition increases with pressure. When the cell voltage and methane composition findings are combined, the outcomes of the electrical energy per kg of CH <sub>4</sub> produced may be predicted. The ratio of electrical energy to CH <sub>4</sub> mass produced changes proportionally with cell voltage. It does, however, vary irreversibly with the amount of methane produced. As a result, while methane production is unaffected by the cell's inlet temperature and cell voltage increases with it, the electrical energy per kg of CH <sub>4</sub> produced must also increase with temperature, as shown in (d). However, for the inlet pressure, the electrical energy ratio per kg of CH <sub>4</sub> produced is determined by the more significant influence between the cell potential and methane production, which both increase with pressure. According to the study findings, increasing the pressure results in higher electrical energy per the mass of CH <sub>4</sub> produced. In conclusion, temperature and pressure significantly impact the cell's performance and the power-to-gas system's efficiency.

![Fig. 10](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr10.jpg)

Download: Download high-res image (506KB)

Due to the massive number of outcomes obtained by the sensitivity, it was relevant to put some constraints. These constraints target the cell's voltage, outlet temperature, and the final composition of the methane gas. The cell's voltage limit is chosen to be 1.4 V since it was reported, in Ref. \[\], the formation of carbon solid in the cell at a voltage of 1.4 V. The outlet's temperature of the cell is restricted to above the cell's inlet temperature, referring to an exothermic operation of the cell to benefit from the high temperature of the outlet gases for heating the inlet ones. After applying these two limitations, the remaining set of outputs is inspected regarding the final composition of methane gas. At this stage, three cases have been discovered: methane gas rich in H <sub>2</sub>, methane gas rich in CO <sub>2</sub>, and methane gas with H <sub>2</sub> and CO <sub>2</sub> composition meeting the specifications of the natural gas grid. The first case is neglected since it is impossible to separate H <sub>2</sub> from CH <sub>4</sub>. For the second case, a separation process is needed to purify the methane gas from the excess CO <sub>2</sub>, which poses extra expenses. Therefore, it seemed the most appropriate to choose the inputs for having a methane gas composition that meets the requirements of the gas grid. This choice led to minimizing the scope of inputs.

For the selection of the best final input conditions, it was necessary to test each input category in the process and calculate the process efficiency () using Eq. \[\]. This final step allowed us to choose the operating conditions for the process simulation as follows, 650 °C, 1 atm, and a current density of −0.06 A/cm <sup>2</sup>. The inlet flow rates selected were scaled up from a system of 213 cells to a 1 MW system with 1428 cells using the “Rule of three” method. The final flow rates are 31.5 kmol/h of H <sub>2</sub> O, 17 kmol/h of CO <sub>2</sub>, and a recycle of output fuel electrode gas of 0.5 responsible for supplying H <sub>2</sub> and CO, and an additional amount of H <sub>2</sub> O and CO <sub>2</sub> to the inlet mixture of the cell. These inputs correspond to a cell's inlet gas composition of 63% H <sub>2</sub> O, 21% CO <sub>2</sub>, 12% H <sub>2</sub>, and 0.4% CO.(18)

## Process pinch study

The selected optimal conditions from the [parametric study](https://www.sciencedirect.com/topics/engineering/parametric-study) were first applied to the process configuration, published previously in Ref. \[\]. These conditions led to a process efficiency of 63%. Since the pinch integration was not considered previously, it was relevant to address it with the novel model. The pinch integration is performed on coded software CERES. From this [pinch analysis](https://www.sciencedirect.com/topics/engineering/pinch-analysis), the process streams’ hot and cold composite curves and the grand composite curve are obtained, which are presented in **(a)** and **11(b)**, respectively. These curves aim to determine the minimum utility requirements of the system. The results revealed that the minimum heating utility required is zero kW, which is the upper gap between the red and blue curve in **(a)**, and the minimum cooling one is 115 kW, represented by the lower gap between the curves. According to the Pinch study, the process does not require any external heating source, which would result in an efficiency of 70.85%. In this scope, a python model built by Rupu YANG \[,\] during his Ph.D. thesis was used to determine the [heat exchanger network](https://www.sciencedirect.com/topics/engineering/heat-exchanger-network) of the process that may allow reaching the maximum possible efficiency of 70.85%. This code studies the different heating and cooling requirements proposes a series of heat exchanger network configurations, and selects the most flexible and cost-effective one.

![Fig. 11](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr11.jpg)

Download: Download high-res image (208KB)

Accordingly, the python model results were applied to the process simulation, leading to an efficiency of 68.87%, where a slight change was performed on the previously proposed heat integration configuration in Ref. \[\]. Compared to the previous configuration, which provided an efficiency of 63% when applying the co-electrolysis model, the applied pinch study allows us to improve process efficiency by about 6 points. The new design is presented in. The different sections of the process are discussed in detail in Ref. \[\]. The modification targets the “Electrolysis Process” section, mainly two heat exchangers responsible for heating the cell's [inlet feeds](https://www.sciencedirect.com/topics/engineering/feed-inlet). In the previous configuration, the “INCATH” stream is heated by the “OUTCATH” one followed by a heater to reach the 650 °C at the fuel electrode side, and the “INANODE” stream is heated by the “OUTANODE” one to 650 °C, at the oxygen electrode side. The pinch integration proposed a better configuration, where these heat exchangers are crossed to become the “INANODE” stream exchanges heat (Q′) with the “OUTCATH” one in addition to heater support, at the oxygen electrode side, and the “INCATH” stream with the “OUTANODE” (Q″).

![Fig. 12](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr12.jpg)

Download: Download high-res image (856KB)

In summary, in this simulation, the MCEC operates at a power density of 0.082 W/cm <sup>2</sup> per cell, producing approximately 1.3 tons/day of methane gas ready for injection into the [natural gas network](https://www.sciencedirect.com/topics/engineering/natural-gas-network), where gas injection requirements in France are as follows: *<* 6% H <sub>2</sub>, *<* 2.5% CO <sub>2</sub>, *<* 2% CO, and a Wobbe Index between 49.1 and 56.52 MJ/m <sup>3</sup> \[\]. Besides, the overall process proves the efficiency of 68.87%, representing the total power produced over that consumed by the system (see ).

Table 3. Principle Results of the Power-to-Gas process simulation.

| Parameters | Value |
| --- | --- |
| Power Density | 0.082 W/cm <sup>2</sup> per cell |
| Number of Cells | 1428 cells |
| Total System Power | 1 MW |
| Methane Produced | 1.29 tonne/day |
| Methane Composition | 94.44% CH <sub>4</sub>, 3.15% H <sub>2</sub>, 2.2% CO <sub>2</sub>, 0.2% H <sub>2</sub> O, and traces of CO |
| Methane Wobbe Index | 50.9235 MJ/Nm <sup>3</sup> (at 0 °C and 1 atm standard conditions) |
| Process Efficiency | 68.87% |

## Conclusion

This paper demonstrates a model used to evaluate the co-electrolysis process within the Molten Carbonate Electrolysis Cell (MCEC). The co-electrolysis model gives valuable insight into the cell's operating conditions. Based on the study's findings, it was concluded that CO <sub>2</sub> electrolysis imposes certain constraints on the applied current density for safe cell operation. This constraint is due to the massive consumption of CO <sub>2</sub> during the co-electrolysis process, where the limiting current density is rapidly reached. Furthermore, this state provokes a rapid increase in the [cell voltage](https://www.sciencedirect.com/topics/engineering/cell-voltage) and temperature, where the values obtained are higher by around 65% and 40%, respectively than when neglecting CO <sub>2</sub> electrolysis. Indeed, this state can be problematic for the safety of the cell operation, as high cell voltages and temperatures can cause cell degradation.

Afterward, the co-electrolysis model responsible for producing synthetic gas (H <sub>2</sub> & CO) is combined with a methanation process. This system is simulated in Aspen Plus software. Due to the limiting current density constraint, it is essential to select the operating conditions to avoid this state. Therefore, a profound sensitivity analysis was conducted to optimize the process by choosing the optimal conditions for bypassing this constraint and producing methane gas ready for injection in the French natural gas grid. In addition to the process optimization, a [pinch analysis](https://www.sciencedirect.com/topics/engineering/pinch-analysis) study was carried out to improve the process's energy efficiency by acting on the energy recovery and reuse possibilities. The [optimized process](https://www.sciencedirect.com/topics/engineering/optimized-process) showed an efficiency of 68.87% and methane production of 1.3 tons/day, ready for injection into the natural gas network.

In conclusion, co-electrolysis of CO <sub>2</sub> and H <sub>2</sub> O inside the electrolysis cell is a novel process that requires more research and experimental investigation to fully understand its influence on cell performance and deterioration over time. Nevertheless, based on this study, it can be stated that, for safe cell operation, it is critical to consider the possibility of co-electrolysis within the cell.

## Funding

This study was partially supported by the French National Research Agency, France (ANR) with the MCEC project of the reference ANR-17-CE05-0025.

## Declaration of competing interest

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.

## Acknowledgements

We would like to acknowledge Chimie ParisTech for their collaboration and support in the experimental research.

## References

[View Abstract](https://www.sciencedirect.com/science/article/abs/pii/S0360319923015690)

[^1]: ## Introduction

The European Union aims to achieve climate neutrality by 2050 and has committed to reducing net emissions by at least 55% by 2030 \[\]. This target could be reached by raising the share of renewable energy since energy production and consumption contribute to more than 75% of the EU's total greenhouse gas emissions. For this reason, the European Commission revised the [Renewable Energy Directive](https://www.sciencedirect.com/topics/engineering/renewable-energy-directive) in May 2022 and proposed increasing the renewable energy share's target from 32% in 2018 to 45% by 2030 \[\]. However, the massive introduction of renewable energies for [electricity generation](https://www.sciencedirect.com/topics/engineering/power-generation) planned for the middle of this century poses some problems related to the difficulty in balancing electricity production with the demand and the transmission and distribution of electricity responsible for managing the national electricity network due to its intermittence and fluctuation. Therefore, massive energy storage and a transmission and [distribution network](https://www.sciencedirect.com/topics/engineering/electric-power-distribution) are required to address the challenges of renewable energy.

[Energy storage systems](https://www.sciencedirect.com/topics/engineering/energy-storage-system) are currently being explored, developed, and implemented. Renewable energy may be stored in four ways: mechanically, electrically, thermally, or chemically. Each energy storage system's technology maturity level is divided into three categories: research and development, demonstration and deployment, and commercialization.

The energy storage system must meet the storage requirements, which are large storage capacity and long-term storage. Among all the storage techniques, chemical storage using a Power-to-Gas system proved to have a high storage capacity ranging between 100 GWh and 10 TWh and a long-term storage period \[\]. This system consists of an [electrolysis system](https://www.sciencedirect.com/topics/engineering/electrolysis-system), which uses renewable electric energy to split water into hydrogen, and a methane synthesis system, which combines the produced H <sub>2</sub> with the captured [CO](https://www.sciencedirect.com/topics/materials-science/carbon-monoxide) <sub>2</sub> to form methane gas. This method is now being implemented with low-temperature [electrolysis cells](https://www.sciencedirect.com/topics/engineering/electrolysis-cell): alkaline or proton membrane electrolyzers. On the other hand, High-temperature electrolysis has been demonstrated in studies to lower electrical demand while raising thermal needs \[\]. Therefore, there was an interest in studying high-temperature electrolysis using solid-oxide electrolyzers.

In this scope of interest, molten carbonate electrolysis cell (MCEC) emerged from the [MCFC](https://www.sciencedirect.com/topics/engineering/molten-carbonate-fuel-cell) technology as a novel system for power-to-gas application. This technology gains extreme interest due to the high development stage of MCFC technology, which is the only one that accounts for all [fuel cell technologies](https://www.sciencedirect.com/topics/engineering/fuel-cell-technology) \[\]. Its power plants are on the multimegawatt power scale. MCECs operate at 600–700 °C and are based on a molten carbonate electrolyte suspended in a porous and chemically inert matrix. The [hydrogen electrode](https://www.sciencedirect.com/topics/engineering/hydrogen-electrode) is coated by Nickel-based alloy with chromium and [aluminum](https://www.sciencedirect.com/topics/materials-science/aluminum) composition between 2 and 10% to reduce sintering and mechanical issues \[\]. The [oxygen electrode](https://www.sciencedirect.com/topics/engineering/oxygen-electrode) comprises NiO catalysts with lithium \[\]. The ability of its carbonate electrolyte to trap large amounts of CO <sub>2</sub> raises the possibility of reducing [carbon dioxide](https://www.sciencedirect.com/topics/chemical-engineering/carbon-dioxide) within it to generate [syngas](https://www.sciencedirect.com/topics/engineering/syngas) (H <sub>2</sub> & CO) through a co-electrolysis process. The co-electrolysis of CO <sub>2</sub> and H <sub>2</sub> O in molten carbonate electrolysis cells is being examined to establish the molten carbonates’ capacity to [electrolyze](https://www.sciencedirect.com/topics/engineering/electrolyzer) CO <sub>2</sub> into CO.

Some research studies were carried out to study the electrochemical conversion of CO <sub>2</sub> into CO in the molten carbonate electrolyzer. For example, Peelen et al., 1997 \[\] explored the [electrochemical reduction](https://www.sciencedirect.com/topics/materials-science/electrochemical-reaction) of CO <sub>2</sub> into CO on a flag electrode of gold material in 62/38 mol % of Li/K carbonate mixture at temperatures ranging from 575 to 700 °C. Likewise, Kaplan et al. (2010,2012) \[,\] declared the conversion of CO <sub>2</sub> to CO in a cell based on an electrolyte mixture of Li <sub>2</sub> CO <sub>3</sub> /Li <sub>2</sub> O, and working at temperatures of 850–900 °C, significantly higher than the operating temperature of the MCFC. The cell's anode electrodes were graphite, and the cathode ones were titanium, which differed from conventional MCFC electrodes based on Nickel (Ni) materials. These studies demonstrated the electrochemical CO <sub>2</sub> conversion using flag electrodes rather than the Ni-based conventional MCFC electrodes. Lately, Meskine et al., 2020 \[\] have affirmed the electrochemical production of CO via CO <sub>2</sub> electrolysis using conventional MCFC electrode materials. Nevertheless, their study poses a limited operation cell potential of 1.4 V for avoiding the production of [carbon deposit](https://www.sciencedirect.com/topics/engineering/carbon-deposit) (C) rather than CO, thus damaging the cell. Although all the research studies have verified the occurrence of the CO <sub>2</sub> electrolysis inside the molten carbonate electrolysis cell, it is not yet considered in any developed MCEC model.

All models have assumed that carbon monoxide (CO) is only generated chemically via the reverse [water gas shift](https://www.sciencedirect.com/topics/engineering/water-gas-shift). Hu L., 2014 \[\] was the first to develop a model for the reversible operation of a Molten Carbonate Fuel Cell. His model considers the reversible shift of the reactions that occur in the MCFC and the chemical production of CO by reverse [water gas shift](https://www.sciencedirect.com/topics/chemical-engineering/water-gas-shift). However, the CO <sub>2</sub> electrolysis was neglected for kinetic reasons, as stated in his work. Later, Reyes-Belmonte et al., 2017 \[\] proposed a model to investigate the effects of the operating conditions on the MCEC performance. In their model, they employed only the electrochemical reactions for only producing H <sub>2</sub>. Besides, Mastropasqua et al., 2018 \[\] simulated the reversible operation of the molten carbonate fuel cell by developing a model that took into account the chemical production of CO inside the cell. Recently, Pérez-Trujillo et al., 2020 \[\] and Barelli et al., 2020 \[\] investigated the cell's performance using a numerical model that assumes CO generation by reverse water gas shift. Also, Ferrario et al., 2021 \[\] conducted an experimental-simulative technique to investigate the integration of a system of the MCEC unit under varied operating circumstances in a steam-reforming process of an Italian oil refinery. They developed the mass balance of their model based on the electrochemical reaction for [hydrogen generation](https://www.sciencedirect.com/topics/engineering/hydrogen-generation) and the chemical reaction for CO creation. In this work, a model is developed to cover both H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis for [syngas production](https://www.sciencedirect.com/topics/engineering/syngas-generation) in the MCEC.

This research presents a co-electrolysis model based on electrochemical knowledge and material and energy balances built within [Aspen Custom Modeler](https://www.sciencedirect.com/topics/engineering/aspen-custom-modeler) (ACM). This model was applied to two different scenarios. The first model (Scenario I) is composed of the electrolysis of H <sub>2</sub> O, which is the source of H <sub>2</sub> production, and the chemical reaction “Reverse Water Gas Shift (RWGS)," which is the source of CO production. This model was presented in a previous paper \[\]. However, in the second model (Scenario II), which will be presented in this paper, the H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis was considered to produce H <sub>2</sub> and CO in parallel with the chemical reaction “RWGS”. The main target of the model is to determine the outlet temperature of the molten carbonate electrolysis cell and the cell potential, taking into account the over-potential losses. So, this work aims at evaluating the co-electrolysis of CO <sub>2</sub> and H <sub>2</sub> O compared to the standard H <sub>2</sub> O electrolysis. Finally, the [technical feasibility](https://www.sciencedirect.com/topics/engineering/technical-feasibility) of a 1 MW power-to-gas system based on the MCEC electrolyzer's co-electrolysis model is investigated.

## Theory

The process of splitting water into hydrogen and oxygen using electricity is known as electrolysis. This reaction takes place in a device known as an [electrolyzer](https://www.sciencedirect.com/topics/engineering/electrolyzer). Electrolyzers, like fuel cells, are made up of an anode and a cathode separated by an electrolyte. Different electrolyzers work differently according to the various electrolyte materials used and the ionic species they conduct. For example, in the molten carbonate [electrolysis cell](https://www.sciencedirect.com/topics/engineering/electrolysis-cell), H <sub>2</sub> O is reduced into H <sub>2</sub> at the cathode electrode side with the aid of [CO](https://www.sciencedirect.com/topics/materials-science/carbon-monoxide) <sub>2</sub> that is required to generate the [carbonate ion](https://www.sciencedirect.com/topics/engineering/carbonate-ion) environment, as presented in Eq.. The carbonate ions CO <sub>3</sub> <sup>2−</sup> are then carried through the electrolyte and oxidized at the anode electrode side, as described in Eq..(1)(2)

The equations given above are the standard ones for H <sub>2</sub> O electrolysis. As previously presented in the literature, a recent study has been conducted on the possibility of electrochemical conversion of CO <sub>2</sub> into CO using the reaction (Eq. ). Thus, the overall redox equation of the H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis can be written as presented in Eq..(3)(4)

Moreover, carbon monoxide can be chemically produced via Reverse [Water Gas Shift](https://www.sciencedirect.com/topics/engineering/water-gas-shift) RWGS (Eq. ) due to the presence of CO <sub>2</sub> and H <sub>2</sub> at the Ni-electrode interface, where the operating temperature of 650 °C and Ni-catalyst favor the [RWGS reaction](https://www.sciencedirect.com/topics/engineering/water-gas-shift-reaction) thermodynamically.(5)

## Model development

In the standard model, the H <sub>2</sub> O electrolysis is the only occurring [electrochemical reaction](https://www.sciencedirect.com/topics/materials-science/electrochemical-reaction). This means that the applied current is utilized to produce H <sub>2</sub>. Thus, according to Faraday's Law, the amount of H <sub>2</sub> produced by H <sub>2</sub> O electrolysis can be calculated using Eq. by dividing the applied current, corresponding to the multiple of the applied current density (*j*) and the electrode's active surface area (*S*), by the multiple of the exchanged number of electrons () with the [Faraday's constant](https://www.sciencedirect.com/topics/engineering/faradays-constant) ().(6)

In our case, the model considers both H <sub>2</sub> O and CO <sub>2</sub> electrolysis. Therefore, it is assumed that the global current density can be split between H <sub>2</sub> O and CO <sub>2</sub> electrolysis using the following equations \[\]: Eq. and Eq..(7)(8)

The parameter refers to the repartition of the electrode active sites between both electrochemical reactions \[\]. It can be expressed by the relative percentage of inlet H <sub>2</sub> O (*)* and CO <sub>2</sub> () at the electrode interface (Eq. ).(9)

### Material balance

A material balance is performed at the exit of the fuel and [oxygen electrodes](https://www.sciencedirect.com/topics/engineering/oxygen-electrode), aiming to determine the [molar quantity](https://www.sciencedirect.com/topics/engineering/molar-quantity) of species formed from the reactions. This balance requires the amount of the H <sub>2</sub> O reacted electrochemically (), and that of CO <sub>2</sub> () at the fuel electrode, that are calculated using Faraday's Law equation. Based on the current split assumption, and can be calculated according to Eq. and Eq., respectively. On the other hand, the molar flow of the reacted CO <sub>2</sub> by the chemical reaction (RWGS) is calculated from the [equilibrium constant](https://www.sciencedirect.com/topics/engineering/equilibrium-constant), which is a function of temperature and the [partial pressures](https://www.sciencedirect.com/topics/engineering/partial-pressure) of the species at equilibrium, by applying the formula presented in Ref. \[\].(10)(11)

The above equations depend on the current density (A/cm <sup>2</sup>), electrode active area (cm <sup>2</sup>), Faraday's constant (C/mol), and the number of electrons involved in the reaction .

According to the [stoichiometric coefficient](https://www.sciencedirect.com/topics/engineering/stoichiometric-coefficient) of the co-electrolysis reaction Eq., [carbon dioxide](https://www.sciencedirect.com/topics/materials-science/carbon-dioxide) CO <sub>2</sub> is the [limiting reactant](https://www.sciencedirect.com/topics/engineering/limiting-reactant), meaning it is the first to be consumed. At these conditions, the reactions are entirely halted due to reactant by-product blockage at the [electrode surface](https://www.sciencedirect.com/topics/engineering/electrode-surface), and the corresponding current density is called “limiting current density” \[\]. The [limiting current density](https://www.sciencedirect.com/topics/engineering/limiting-current-density) is calculated using Eq..(12)

### Electrochemical model

The electrochemical model is performed to determine the cell potential and power. The cell potential comprises the Nernst () voltage and the cell's internal resistance. The developed model in Monzer et al., 2021 \[\] has been modified to account for co-electrolysis. The cell potential equation remains unchanged, but the Nernst voltage and reversible voltage () are adjusted to account for the CO <sub>2</sub> electrolysis, as shown in Eq. and Eq., respectively.(13)(14)

The electric power consumed by the electrolyzer is calculated using Eq..(15)

### Energy balance

A heat balance must be performed for the model to be complete (Eq. ). From this heat balance, the outlet temperature of the cell on both sides can be calculated.(16)

In the above equation, the heat capacity ( (kJ/mol.K)) is calculated using data from NIST Webbook \[\] at the average temperature () between the [inlet temperature](https://www.sciencedirect.com/topics/engineering/inlet-temperature) of the cell () and the cell temperature (). As for the , it represents the [heat of reactions](https://www.sciencedirect.com/topics/materials-science/heat-of-reaction) occurring in the cell and is calculated according to the equation Eq. 17. The heat of reactions required for H <sub>2</sub> O electrolysis consists of the amount of H <sub>2</sub> produced () during the process and the [water electrolysis](https://www.sciencedirect.com/topics/engineering/water-electrolysis) heat [enthalpy's change](https://www.sciencedirect.com/topics/engineering/enthalpy-change) (). In the case of CO <sub>2</sub> electrolysis, it is a function of the amount of CO produced and the change in heat enthalpy (). For the reverse [water gas shift reaction](https://www.sciencedirect.com/topics/engineering/water-gas-shift-reaction), the reaction heat is determined by the amount of CO produced () and the heat enthalpy's change ().(17)

### Model conditions and assumptions

The model was evaluated based on the experimental conditions applied at the “Ecole Nationale de la Chimie de Paris” \[\]. The laboratory testing electrolysis cell is a single-cell set-up with an electrode surface area of 3.14 cm <sup>2</sup>, developed with the aid of Fiaxell® testing systems. It includes the stack electrodes (fuel electrode Ni and oxygen electrode NiO, 2.1 cm diameter and respectively 0.08 cm and 0.069 cm thickness), electrolytic matrix (*γ* -LiAlO <sub>2</sub>, 3.6 cm diameter and 0.05 cm total thickness), and electrolyte (Li–K 62:38 mol%, 3.6 cm diameter and 1.8 mm total thickness). The cell operates at 650 °C and atmospheric pressure. The fuel electrode of the cell is fed by a [gas mixture](https://www.sciencedirect.com/topics/engineering/gas-mixture) of 64% H <sub>2</sub>, 20% H <sub>2</sub> O, and 16% CO <sub>2</sub>, while the oxygen electrode's [inlet gas](https://www.sciencedirect.com/topics/engineering/inlet-gas) composition is 30% CO <sub>2</sub>, 15% O <sub>2</sub>, and 55% N <sub>2</sub>.

Within the model build-up, the following assumptions were considered.
- •
	The equilibrium reverse of the RWGS reactions is not considered, where it is assumed that the equilibrium constant K is zero.
- •
	When the applied current density is greater than the limiting current density, the calculations are performed at the limiting current density conditions.
- •
	The possible reactions that may occur within the [bipolar plates](https://www.sciencedirect.com/topics/engineering/bipolar-plate) are not considered.
- •
	The [methanation](https://www.sciencedirect.com/topics/engineering/methanation) reaction inside the cell is not considered in this study because the cell's inlet conditions don't meet the ones required to promote methane production.

## Results and discussion

### Model results

The main conceptual difference between the two scenarios is the CO <sub>2</sub> electrolysis inside the cell (see ). The presence of CO <sub>2</sub> electrolysis inside the cell has changed its mass and energy balance and the electrochemical model. In this work, an analysis was performed for Scenario II to investigate the impact of the current density on the cell potential, the cell's [outlet composition](https://www.sciencedirect.com/topics/engineering/outlet-composition), and the [cell's stream](https://www.sciencedirect.com/topics/engineering/stream-cell) outlet temperature. The outcomes of this investigation are further compared with that of Scenario I.

Table 1. The conditions of the two different scenarios.

| Empty Cell | H <sub>2</sub> O electrolysis | CO <sub>2</sub> electrolysis | RWGS |
| --- | --- | --- | --- |
| Scenario I | YES | NO | YES |
| Scenario II | YES | YES | YES |

#### The trend of outlet gas composition with the current density

The outlet composition of the gases, mainly H <sub>2</sub> O, CO <sub>2</sub>, H <sub>2</sub>, and CO, change with the current density is illustrated in (a) for Scenario I and (b) for Scenario II. Both graphs demonstrate that the outlet H <sub>2</sub> gas composition (gray dotted line) increases while the outlet H <sub>2</sub> O gas composition (yellow dotted line) decreases, indicating that water is involved in [hydrogen production](https://www.sciencedirect.com/topics/engineering/hydrogen-production). However, at [high current densities](https://www.sciencedirect.com/topics/engineering/high-current-density), the outlet CO gas composition (orange-solid line) and the outlet CO <sub>2</sub> gas composition (blue-solid line) differ from Scenarios I to Scenario II. The intervention of CO <sub>2</sub> electrolysis can typically explain this difference. In Scenario I, CO and CO <sub>2</sub> gas compositions decrease with the increase in the current density. This result can be presented according to the dominance between the RWGS and electrochemical reactions. As the current density increases, the electrochemical reaction takes precedence over the RWGS chemical reaction, resulting in a reduction in CO produced by the RWGS reaction because H <sub>2</sub> O electrolysis consumes carbon dioxide rather than RWGS. On the other hand, in Scenarios II, the outlet CO gas composition (orange-solid line) declines with the increase in current density with the same trend as that in (a). However, at a specific current density of −0.2 A/cm <sup>2</sup>, which is the dip point, the curve change where the CO composition increases with the current density to become stable at the end. Parallel to this, the outlet CO <sub>2</sub> gas composition, represented by the blue-solid line, considerably decreases and then rapidly starts to fall at a current density of −0.2 A/cm <sup>2</sup> to reach zero at the end.

![Fig. 1](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr1.jpg)

Download: Download high-res image (400KB)

The reason for this divergence in these curves is better explained in, which illustrates how the outlet CO composition trend is linked to the evolution of the CO <sub>2</sub> electrolysis and RWGS processes. This curve may be used to derive two distinct origins that define the cause of the variance. The first origin is related to the condition in which the RWGS equilibrium is not attained, indicating that the RWGS reaction is not taking place inside the cell. For example, reveals that at a current density of −0.2 A/cm <sup>2</sup>, the mole of CO generated by RWGS is zero, implying that RWGS does not occur. At this point, the CO <sub>2</sub> electrolysis process yields CO solely. This situation leads to a divergent increase in the outlet CO trend, which follows the increasing trend of CO <sub>2</sub> electrolysis. The second origin is the point at which the [limiting current density](https://www.sciencedirect.com/topics/engineering/limiting-current-density) is achieved, and all CO <sub>2</sub> is consumed. In (b), the CO <sub>2</sub> composition curve shows that after a given current density (−0.23 A/cm <sup>2</sup>), the output CO <sub>2</sub> composition reaches zero, meaning that the CO <sub>2</sub> has been entirely consumed. At this point, the cell is operating at the limiting current density of −0.23 A/cm <sup>2</sup>, and it cannot work at a current density above this. As a result, the curve becomes steady. This restriction is applied to the model to avoid exceeding the limiting current density. Therefore, it was assumed that if the operating current density is more than the calculated limited current density, the model will use the latter.

![Fig. 2](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr2.jpg)

Download: Download high-res image (174KB)

#### Sensitivity analysis on CO gas composition: limiting current density

To better evaluate the co-electrolysis of H <sub>2</sub> O and CO <sub>2</sub>, a sensitivity study was performed on the deviation of the CO outlet gas composition with the [inlet gas](https://www.sciencedirect.com/topics/engineering/inlet-gas) composition of the cell. As was reported in the previous paper \[\], part of the outlet gas of the cell's fuel electrode is being recycled to the cell for thermal management reasons and the obligation of having a quantity of H <sub>2</sub> in the inlet feed stream for electrode stability \[\]. The recycled stream contains CO apart from H <sub>2</sub>, H <sub>2</sub> O, and CO <sub>2</sub>. For this reason, it was necessary to have an overview of the impact of the inlet CO on the point of deviation presented in.

In this study, three cases of the fuel electrode's inlet gas compositions are evaluated, shown in detail in.

Table 2. Cell's inlet gas compositions of the three studied cases.

| Empty Cell | H <sub>2</sub> O | CO <sub>2</sub> | H <sub>2</sub> | CO |
| --- | --- | --- | --- | --- |
| Case I | 52% | 40% | 8% | 0% |
| Case II | 52% | 40% | 7.14% | 0.86% |
| Case III | 52% | 40% | 6% | 2% |

From this study, it can be highlighted the evolution of the total CO outlet composition, illustrated in (a), and the CO flow rate produced from RWGS, represented in (b). These results offer a clear insight into the deviation's changing point explained in. Furthermore, from (a), it can be revealed that the curve deviates at [lower current densities](https://www.sciencedirect.com/topics/engineering/low-current-density) with the increase in the inlet CO composition. For example, in Case I, where there is no inlet CO to the cell, the curve has an optimum point at a current density of −0.12 A/cm <sup>2</sup> and reaches a steady state at a limiting current density of −0.15 A/cm <sup>2</sup>. On the contrary, in Case III, where the inlet gas contains 2% CO, the curve's optimum is obtained at a current density of −0.02 A/cm <sup>2</sup> and the limiting current density of −0.11 A/cm <sup>2</sup>.

![Fig. 3](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr3.jpg)

Download: Download high-res image (200KB)

The optimum point reveals that the RWGS reaction is not occurring at the electrode's interface. This observation may be demonstrated by examining the CO flow rate produced by RWGS in (b), where at the optimum point in (a), the CO flow rate becomes zero. After this point, the CO outlet composition increases due to the CO <sub>2</sub> electrolysis to CO.

Furthermore, it can be noticed that the gap between the optimum point and the steady state one is broader in Case III at 2% CO [inlet composition](https://www.sciencedirect.com/topics/engineering/inlet-composition) compared to other cases, which means that the CO production electrochemically is enhanced at a lower current density with the increase in CO inlet composition. However, this analysis could be altered if the equilibrium shift of RWGS is reversed after the optimum point, which could cause CO consumption by WGS reaction. Finally, based on this model's study, it can be revealed that the input gas composition alters the deviation in the CO and CO <sub>2</sub> outlet gas compositions due to the change in the RWGS equilibrium and the limiting current density in the function of these compositions.

#### The trend of cell potential and temperature with the current potential

Apart from the mass balance results, the cell potential and gas outlet temperature evolution were examined between the two scenarios. Since there is a link between the cell potential and the outlet gases within the Nernst equation, it is expected to be affected similarly to the gas composition in Scenario II. The cell potential evolution with the current density is comparable between Scenarios I and II till reaching the point of deviation explained previously. As shown in, this circumstance results in a sharp increase in cell potential once approaching the limiting current density since the low CO <sub>2</sub> reacting agent caused higher concentration losses, thus higher overpotentials. On the other hand, the outlet gas temperature is also influenced by its composition when applying the energy balance. So, by comparing the results of Scenario I in (a) with that of Scenario II in (b), it can be noticed that the temperature is similar till reaching the breakeven point of a current density of −0.19 A/cm <sup>2</sup>. However, the curve trend slightly deviates to higher temperatures in Scenario II after this point, then sharply increases from 850 °C (−0.225 A/cm <sup>2</sup>) to 1060 °C (−0.25 A/cm <sup>2</sup>) when approaching the limiting current density, as depicted in (b). This observation can be seen when comparing the cell potential and the temperature levels between both Scenarios. For example, at −0.225 A/cm <sup>2</sup>, the temperature is 850 °C, and the cell potential is 2.1 V in Scenario II. However, this point refers to a temperature of around 750 °C and a cell potential of 1.7 V in Scenario I.

![Fig. 4](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr4.jpg)

Download: Download high-res image (184KB)

![Fig. 5](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr5.jpg)

Download: Download high-res image (303KB)

The cell potential and temperature outcomes at the state of the limiting current density were also obtained by A. Szczesniak et al., 2020 \[\] in their analysis of the effects of various malfunctions on the performance of the [molten carbonate fuel cell](https://www.sciencedirect.com/topics/engineering/molten-carbonate-fuel-cell). They reported that low [feed gas flow](https://www.sciencedirect.com/topics/engineering/feed-gas-flow), one of the studied malfunctions, causes a decrease in [cell voltage](https://www.sciencedirect.com/topics/engineering/cell-voltage) and a considerable growth in cell temperature while operating in fuel cell mode. However, in the electrolysis mode, it can be figured out that this malfunction will cause a sharp increase in cell potential and temperature. In conclusion, these findings reveal the importance of considering the CO <sub>2</sub> electrolysis in the cell since it affects its operating conditions, thus causing its damage if no precautions are taken.

Generally, both models are comparative to some extent, just before the point of divergence caused by the co-electrolysis state. Two aspects can explain this similarity. The first is that both models have the exact total applied current density. However, this current is solely used for H <sub>2</sub> O electrolysis in Scenario I; whereas in Scenario II, it is divided between H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis. The second is the equilibrium balance of the reverse water gas shift reaction with the CO <sub>2</sub> electrolysis reaction, which yields a similar gas composition at the beginning in both models. These findings were obtained by ANR partner Chimie ParisTech \[\] using a thermodynamic simulation with a current density ranging from 0 to −0.2 A/cm <sup>2</sup>. Their findings concluded that both H <sub>2</sub> O electrolysis and H <sub>2</sub> O and CO <sub>2</sub> co-electrolysis produce the same outlet results. Besides, the outlet CO composition represented by the black curve in is analogous to the percentages obtained by the ANR partner Chimie ParisTech's work \[\]. Finally, it should be noted that the model was validated with their experimental data and other work data presented in the previous [research work](https://www.sciencedirect.com/topics/engineering/research-work) \[\].

### Simulation of the 1 MW power to gas system

#### Process overview

The power-to-gas system comprises two essential sub-processes representing the system's heart. First comes the electrolysis process, which is responsible for providing the raw material for methane production, mainly hydrogen. The produced hydrogen is then combined with a CO <sub>2</sub> source to pass to another part of the process: [methanation](https://www.sciencedirect.com/topics/engineering/methanation). This process is conventional for the power-to-gas system. The commercially available electrolyzers (Alkaline and [Proton Exchange Membranes](https://www.sciencedirect.com/topics/engineering/proton-exchange-membrane) electrolyzers) produce only hydrogen. However, in the MCEC technology, both H <sub>2</sub> O and CO <sub>2</sub> are needed for cell operation. Therefore, these gases undergo co-electrolysis to form synthetic gases H <sub>2</sub> and CO. This mixture corresponds to the intermediate stage of Sabatier CO <sub>2</sub> methanation and may thus be easily converted into methane. In this study, the process was simulated in Aspen Plus software and used the model built in [Aspen Custom Modeler](https://www.sciencedirect.com/topics/engineering/aspen-custom-modeler). The principle concept of the process was presented in Ref. \[\], where each part is explained in detail. However, in this paper, some modifications were performed after adding the concept of co-electrolysis to the model, which wasn't considered previously.

By referring to the simulation in Ref. \[\], this work presents its novel version where the Power-to-gas process is based on the MCEC co-electrolysis model and is scaled up from 250 kW to 1 MW. In this part, a sensitivity analysis was conducted to select the optimal conditions for the best process efficiency. Additionally, a pinch study with a [heat exchanger network](https://www.sciencedirect.com/topics/engineering/heat-exchanger-network) is carried out.

#### Process optimization

The co-electrolysis process poses a series of restrictions due to the limiting current density. As mentioned previously, the limiting current density changes with the inlet composition of the cell. As a consequence, the outlet gas compositions are altered. Since the target of the process is to produce a methane gas that meets the requirements of the [natural gas network](https://www.sciencedirect.com/topics/engineering/natural-gas-network), the operating conditions of the process have to be carefully selected. For this purpose, a profound sensitivity analysis is performed by developing an [Excel VBA](https://www.sciencedirect.com/topics/chemical-engineering/microsoft-excel-vba) code linked to the Aspen Plus simulation.

The sensitivity analysis compromises the key variables, the outputs, and the constraints on the outcomes. The key variables are the cell's [inlet temperature](https://www.sciencedirect.com/topics/engineering/inlet-temperature), operating pressure, the water and CO <sub>2</sub> [inlet flow rates](https://www.sciencedirect.com/topics/engineering/inlet-flowrate), and the current density. The margin of change of critical variables is fixed based on several constraints and parameters. First, the cell's inlet temperature is varied between 500 °C and 750 °C to ensure the full coverage of the melting point temperature of all the molten carbonate mixtures of the electrolyte. Second, the range of the cell's operating pressure is fixed between 1.013 bar and 6 bar since, from the thermodynamic approach, the cell voltage increases with pressure, which is not recommended. Third, the water and CO <sub>2</sub> inlet flow rates are chosen to vary between 5 and 15 kmol/h. This range was chosen arbitrarily because the most crucial factor is the composition ratio of H <sub>2</sub> O and CO <sub>2</sub> at the fuel electrode side, which is also influenced by the split fraction of CO <sub>2</sub> flow between both electrodes and the recycling ratio of the fuel electrode's outflow to its inlet. Finally, the current density is varied between −0.04 and −0.16 A/cm <sup>2</sup>, where a limit of −0.16 A/cm <sup>2</sup> is put due to the increase of cell potential with the current density, which can cause the cell's melt. It must be noted that these margins were applied on a simulation where the MCEC consists of 213 cells.

The outputs are those related to the performance of the electrolysis and methanation processes. They include the cell's voltage, outlet temperature, the total electrical energy consumed by the cell per methane gas produced (E <sub><em>elec</em></sub> /m <sub><em>CH</em> 4</sub>), and the final methane composition (Y <sup>f</sup> <sub>CH4</sub>). Before selecting the optimal inputs, it is essential to understand the impact of each input parameter on the outlet one. First, starting with the current density, its impact on the cell's outlet temperature, voltage, outlet methane composition, and the cell's energy per methane gas produced is presented in. This study was conducted at a fixed value of inlet temperature of 650 °C, the pressure of 1.013 bar, inlet H <sub>2</sub> O and CO <sub>2</sub> flow rate of 5 kmol/h and 7 kmol/h, respectively, a CO <sub>2</sub> split fraction of 0.5, and recycling ratio of 0.2. From (a), it can be seen that the temperature decreases with the increase negatively in current density to reach an optimum at −0.06 A/cm <sup>2</sup>, then increases progressively with the current density. At the fixed parameters' conditions, the cell is observed operating in the endothermic state; however, this state changes when changing the rest of the parameters. As for the cell's voltage ((b)), it increases with the current density, as expected. Since the system is a power-to-gas process, it is essential to look at the outlet methane composition (Y <sup>f</sup> <sub>CH4</sub>), depicted in (c). The results show that the current density affects the outlet methane composition, which increases with the current density. Finally, there are the outcomes of the electrical energy required per mass-produced CH <sub>4</sub>, presented in (d), which gives a premier vision of the process efficiency. From these results, it can be deduced that this ratio slightly increases with the current density, implying that the process efficiency may be lowered somewhat.

![Fig. 6](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr6.jpg)

Download: Download high-res image (366KB)

Second, the effect of the inlet CO <sub>2</sub> flow rate on the previously mentioned outcome parameters is evaluated and illustrated in. In this case, the fixed input conditions are selected to be the current density at a value of −0.1 A/cm <sup>2</sup>. The other values are similar to the previous case, where the variable parameter is the inlet CO <sub>2</sub> flow rate. The results presented here start with a CO <sub>2</sub> flow rate of 7 kmol/h, not 5 kmol/h since some errors were generated during the aspen simulation, causing some limitations to be added to the VBA code excel to skip the input values that produce these problems. In (a), the cell's outlet temperature decreases rapidly when the CO <sub>2</sub> flow rate increases from 7 to 9 kmol/h, then it gradually decreases to become stable at higher flow rates.

![Fig. 7](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr7.jpg)

Download: Download high-res image (335KB)

Furthermore, the cell voltage is reversibly affected by the CO <sub>2</sub> flow rate increase, where it decreases with the CO <sub>2</sub> flow rate ((b)). This finding is considered a good point from the cell's performance perspective. On the contrary, the produced methane composition is diminished with the increase of CO <sub>2</sub> flow rate. The obtained result can be well explained by the fact that there would be an excess CO <sub>2</sub> in the syn gas entering the methanation process. This circumstance will cause the syn gas ratio to shift from its optimal, thus leading to a possible generation of [carbon deposit](https://www.sciencedirect.com/topics/engineering/carbon-deposit) in the methanation reactor \[\]. On the other hand, the electrical energy per kg of CH <sub>4</sub> produced decreases with CO <sub>2</sub> flow rate till reaching an optimum with 11 kmol/h CO <sub>2</sub> flow rate, then re-increases. From this outcome, it can be deduced that the CO <sub>2</sub> flow rate choice is a compromise between the final CH <sub>4</sub> composition and the electrical energy consumed by the electrolyzer, which is an essential parameter for process efficiency.

Third, similar to CO <sub>2</sub>, the H <sub>2</sub> O flow rate impact on the chosen outcome parameters is also investigated, and the results are depicted in. Here, the CO <sub>2</sub> inlet flow rate is set at 7 kmol/h, and that of H <sub>2</sub> O is varied. The first parameter to look at is the cell's outlet temperature in (a), where the outcomes demonstrate a rapid temperature drop between 5 and 7 kmol/h of H <sub>2</sub> O. After that, the temperature gradually increases with H <sub>2</sub> O flow rate. However, it remains below the temperature obtained at 5 kmol/h. The higher temperature at 5 kmol/h is related to the low [gas flow](https://www.sciencedirect.com/topics/engineering/gas-flow) into the cell, leading to an increase in temperature based on the thermodynamics principle. In addition, the increase in H <sub>2</sub> O flow rate positively impacts cell voltage ((b)) that decreases with the H <sub>2</sub> O flow rate. The same is observed for the outlet methane composition in (c), where it increases linearly when more H <sub>2</sub> O enters the cell. Finally, the process efficiency is enhanced with the increase in H <sub>2</sub> O flow rate, which can be seen by the decrease in the electrical energy consumed per kg of CH <sub>4</sub> produced in (d).

![Fig. 8](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr8.jpg)

Download: Download high-res image (357KB)

In addition to the H <sub>2</sub> O and CO <sub>2</sub> flow rate variation, the CO <sub>2</sub> split fraction between the electrodes (r <sub><em>CO</em> 2 <em>split</em></sub>) and the recycling ratio (R <sub><em>outcathode</em></sub>) of the fuel electrode's outflow to its inlet were studied, where these four parameters determine the cell's inlet composition. The study's outcomes are presented in, where the x-axis presents the recycling ratios studied, and the legend shows the different CO <sub>2</sub> split fractions. For more comprehension, increasing the CO <sub>2</sub> split fractions signifies that more CO <sub>2</sub> enters the fuel electrode where co-electrolysis occurs, indicating that it follows the same concept as increasing the CO <sub>2</sub> flow rate. Likewise, the recycling ratio increase implies that additional H <sub>2</sub> O, CO <sub>2</sub> enters the fuel electrode. Therefore, by analyzing (a), it is apparent that the temperature increases with the recycling ratio regardless of the CO <sub>2</sub> split fraction, except for a split fraction of 0.5, where the temperature declines with the recycling ratio. From the CO <sub>2</sub> split fraction side, the temperature decreases when the fraction increases, mainly above 0.6, regardless of the recycling ratio. However, it cannot be similarly reported for the 0.4 and 0.5 fractions. Even though the temperature at the 0.5 CO <sub>2</sub> split fraction drops with the recycling rate, it stays higher than the temperature at the 0.4 fractions when the recycling ratio is less than 0.4. After that, both CO <sub>2</sub> fractions 0.4 and 0.5 show the same temperature at 0.4 recycling ratio, and then they reverse directions, with 0.4 CO <sub>2</sub> fractions providing a higher temperature than 0.5.

![Fig. 9](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr9.jpg)

Download: Download high-res image (495KB)

Regarding the cell potential in (b), the fluctuation in the outcomes at 0.4 and 0.5 CO <sub>2</sub> fractions can be similarly observed. Whereas, for CO <sub>2</sub> fraction above 0.5, the cell potential decreases while increasing the split fraction, whatever the recycling ratio is. Moreover, for split fractions above 0.5, the cell potential remains relatively constant while the recycling ratio changes. On the contrary, it cannot be stated similarly for split fractions 0.4 and 0.5 because the cell voltage increases with the recycling ratio at 0.4 split fractions and decreases with it at 0.5 split fractions. The results of the methane composition in (c) and the electrical energy per kilogram of CH <sub>4</sub> produced in (d) differ somehow from the previous ones. At all recycle ratios studied, the methane composition decreases as the CO <sub>2</sub> split fraction increases. It does not, however, vary with the recycling ratio, except for a split fraction of 0.4, where it increases until reaching a recycling ratio of 0.4, then drops at a recycling ratio of 0.5. On the other hand, the electrical energy per kg of CH <sub>4</sub> produced decreases while increasing the recycling ratio and the CO <sub>2</sub> split fraction above 0.4; whereas, for 0.4 split fractions, it stays constant with the recycling ratio till a value of 0.4, and then rapidly increases at a recycling ratio of 0.5. Because there are various factors to consider, explaining this fluctuation is complicated. However, it can be deduced that the deficient composition of CO <sub>2</sub> in the feed significantly influences the outlet gas temperature and, consequently, the cell temperature, potential, and power.

Finally, the impact of the [inlet gas temperature](https://www.sciencedirect.com/topics/engineering/inlet-gas-temperature) and pressure is assessed to cover all possible factors impacting the power-to-gas system's efficiency. depicts the variation of the outlet gas temperature, cell's voltage, energy per kg of CH <sub>4</sub> produced, and the methane composition as a function of the temperature and pressure. To study these factors, the model required adjusting the thermodynamic parameters' equations, like enthalpy, entropy, and heat capacity, to include their variation with temperature and pressure. The equations as a function of temperature were taken from NIST Webbook \[\]; however, that of pressure were generated through profound calculations of data extracted from [Aspen Properties](https://www.sciencedirect.com/topics/engineering/aspen-properties). Looking at the results, (a) reveals that the outlet gas temperature increases with the increase in the inlet temperature and pressure. The same is applicable for the cell potential in (b), signifying that the inlet gas temperature and pressure have the same influence on the outlet gas temperature and the cell voltages. As viewed in (c), the methane composition is affected only by the [inlet pressure](https://www.sciencedirect.com/topics/engineering/inlet-pressure), as it increases with the pressure. Two reasons can explain this observation. The first reason is that, at the cell's fixed conditions selected here, the RWGS reaction is not occurring, as described in. Thus, based on thermodynamics and chemical principles, temperature and pressure do not impact the outlet composition. This case explains the obtained constant value of methane composition with the temperature change. The second reason is related to the change of methane composition with pressure, which, based on the first reason, must not change. This change is due to the effect of pressure on the water separation from the syn gas before methanation, where water separation is enhanced with the pressure increase. Therefore, the final syn gas contains less water, which favors methane production, according to [Le Chatelier's](https://www.sciencedirect.com/topics/engineering/le-chatelier) principle, so the methane composition increases with pressure. When the cell voltage and methane composition findings are combined, the outcomes of the electrical energy per kg of CH <sub>4</sub> produced may be predicted. The ratio of electrical energy to CH <sub>4</sub> mass produced changes proportionally with cell voltage. It does, however, vary irreversibly with the amount of methane produced. As a result, while methane production is unaffected by the cell's inlet temperature and cell voltage increases with it, the electrical energy per kg of CH <sub>4</sub> produced must also increase with temperature, as shown in (d). However, for the inlet pressure, the electrical energy ratio per kg of CH <sub>4</sub> produced is determined by the more significant influence between the cell potential and methane production, which both increase with pressure. According to the study findings, increasing the pressure results in higher electrical energy per the mass of CH <sub>4</sub> produced. In conclusion, temperature and pressure significantly impact the cell's performance and the power-to-gas system's efficiency.

![Fig. 10](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr10.jpg)

Download: Download high-res image (506KB)

Due to the massive number of outcomes obtained by the sensitivity, it was relevant to put some constraints. These constraints target the cell's voltage, outlet temperature, and the final composition of the methane gas. The cell's voltage limit is chosen to be 1.4 V since it was reported, in Ref. \[\], the formation of carbon solid in the cell at a voltage of 1.4 V. The outlet's temperature of the cell is restricted to above the cell's inlet temperature, referring to an exothermic operation of the cell to benefit from the high temperature of the outlet gases for heating the inlet ones. After applying these two limitations, the remaining set of outputs is inspected regarding the final composition of methane gas. At this stage, three cases have been discovered: methane gas rich in H <sub>2</sub>, methane gas rich in CO <sub>2</sub>, and methane gas with H <sub>2</sub> and CO <sub>2</sub> composition meeting the specifications of the natural gas grid. The first case is neglected since it is impossible to separate H <sub>2</sub> from CH <sub>4</sub>. For the second case, a separation process is needed to purify the methane gas from the excess CO <sub>2</sub>, which poses extra expenses. Therefore, it seemed the most appropriate to choose the inputs for having a methane gas composition that meets the requirements of the gas grid. This choice led to minimizing the scope of inputs.

For the selection of the best final input conditions, it was necessary to test each input category in the process and calculate the process efficiency () using Eq. \[\]. This final step allowed us to choose the operating conditions for the process simulation as follows, 650 °C, 1 atm, and a current density of −0.06 A/cm <sup>2</sup>. The inlet flow rates selected were scaled up from a system of 213 cells to a 1 MW system with 1428 cells using the “Rule of three” method. The final flow rates are 31.5 kmol/h of H <sub>2</sub> O, 17 kmol/h of CO <sub>2</sub>, and a recycle of output fuel electrode gas of 0.5 responsible for supplying H <sub>2</sub> and CO, and an additional amount of H <sub>2</sub> O and CO <sub>2</sub> to the inlet mixture of the cell. These inputs correspond to a cell's inlet gas composition of 63% H <sub>2</sub> O, 21% CO <sub>2</sub>, 12% H <sub>2</sub>, and 0.4% CO.(18)

## Process pinch study

The selected optimal conditions from the [parametric study](https://www.sciencedirect.com/topics/engineering/parametric-study) were first applied to the process configuration, published previously in Ref. \[\]. These conditions led to a process efficiency of 63%. Since the pinch integration was not considered previously, it was relevant to address it with the novel model. The pinch integration is performed on coded software CERES. From this [pinch analysis](https://www.sciencedirect.com/topics/engineering/pinch-analysis), the process streams’ hot and cold composite curves and the grand composite curve are obtained, which are presented in **(a)** and **11(b)**, respectively. These curves aim to determine the minimum utility requirements of the system. The results revealed that the minimum heating utility required is zero kW, which is the upper gap between the red and blue curve in **(a)**, and the minimum cooling one is 115 kW, represented by the lower gap between the curves. According to the Pinch study, the process does not require any external heating source, which would result in an efficiency of 70.85%. In this scope, a python model built by Rupu YANG \[,\] during his Ph.D. thesis was used to determine the [heat exchanger network](https://www.sciencedirect.com/topics/engineering/heat-exchanger-network) of the process that may allow reaching the maximum possible efficiency of 70.85%. This code studies the different heating and cooling requirements proposes a series of heat exchanger network configurations, and selects the most flexible and cost-effective one.

![Fig. 11](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr11.jpg)

Download: Download high-res image (208KB)

Accordingly, the python model results were applied to the process simulation, leading to an efficiency of 68.87%, where a slight change was performed on the previously proposed heat integration configuration in Ref. \[\]. Compared to the previous configuration, which provided an efficiency of 63% when applying the co-electrolysis model, the applied pinch study allows us to improve process efficiency by about 6 points. The new design is presented in. The different sections of the process are discussed in detail in Ref. \[\]. The modification targets the “Electrolysis Process” section, mainly two heat exchangers responsible for heating the cell's [inlet feeds](https://www.sciencedirect.com/topics/engineering/feed-inlet). In the previous configuration, the “INCATH” stream is heated by the “OUTCATH” one followed by a heater to reach the 650 °C at the fuel electrode side, and the “INANODE” stream is heated by the “OUTANODE” one to 650 °C, at the oxygen electrode side. The pinch integration proposed a better configuration, where these heat exchangers are crossed to become the “INANODE” stream exchanges heat (Q′) with the “OUTCATH” one in addition to heater support, at the oxygen electrode side, and the “INCATH” stream with the “OUTANODE” (Q″).

![Fig. 12](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr12.jpg)

Download: Download high-res image (856KB)

In summary, in this simulation, the MCEC operates at a power density of 0.082 W/cm <sup>2</sup> per cell, producing approximately 1.3 tons/day of methane gas ready for injection into the [natural gas network](https://www.sciencedirect.com/topics/engineering/natural-gas-network), where gas injection requirements in France are as follows: *<* 6% H <sub>2</sub>, *<* 2.5% CO <sub>2</sub>, *<* 2% CO, and a Wobbe Index between 49.1 and 56.52 MJ/m <sup>3</sup> \[\]. Besides, the overall process proves the efficiency of 68.87%, representing the total power produced over that consumed by the system (see ).

Table 3. Principle Results of the Power-to-Gas process simulation.

| Parameters | Value |
| --- | --- |
| Power Density | 0.082 W/cm <sup>2</sup> per cell |
| Number of Cells | 1428 cells |
| Total System Power | 1 MW |
| Methane Produced | 1.29 tonne/day |
| Methane Composition | 94.44% CH <sub>4</sub>, 3.15% H <sub>2</sub>, 2.2% CO <sub>2</sub>, 0.2% H <sub>2</sub> O, and traces of CO |
| Methane Wobbe Index | 50.9235 MJ/Nm <sup>3</sup> (at 0 °C and 1 atm standard conditions) |
| Process Efficiency | 68.87% |

## Conclusion

This paper demonstrates a model used to evaluate the co-electrolysis process within the Molten Carbonate Electrolysis Cell (MCEC). The co-electrolysis model gives valuable insight into the cell's operating conditions. Based on the study's findings, it was concluded that CO <sub>2</sub> electrolysis imposes certain constraints on the applied current density for safe cell operation. This constraint is due to the massive consumption of CO <sub>2</sub> during the co-electrolysis process, where the limiting current density is rapidly reached. Furthermore, this state provokes a rapid increase in the [cell voltage](https://www.sciencedirect.com/topics/engineering/cell-voltage) and temperature, where the values obtained are higher by around 65% and 40%, respectively than when neglecting CO <sub>2</sub> electrolysis. Indeed, this state can be problematic for the safety of the cell operation, as high cell voltages and temperatures can cause cell degradation.

Afterward, the co-electrolysis model responsible for producing synthetic gas (H <sub>2</sub> & CO) is combined with a methanation process. This system is simulated in Aspen Plus software. Due to the limiting current density constraint, it is essential to select the operating conditions to avoid this state. Therefore, a profound sensitivity analysis was conducted to optimize the process by choosing the optimal conditions for bypassing this constraint and producing methane gas ready for injection in the French natural gas grid. In addition to the process optimization, a [pinch analysis](https://www.sciencedirect.com/topics/engineering/pinch-analysis) study was carried out to improve the process's energy efficiency by acting on the energy recovery and reuse possibilities. The [optimized process](https://www.sciencedirect.com/topics/engineering/optimized-process) showed an efficiency of 68.87% and methane production of 1.3 tons/day, ready for injection into the natural gas network.

In conclusion, co-electrolysis of CO <sub>2</sub> and H <sub>2</sub> O inside the electrolysis cell is a novel process that requires more research and experimental investigation to fully understand its influence on cell performance and deterioration over time. Nevertheless, based on this study, it can be stated that, for safe cell operation, it is critical to consider the possibility of co-electrolysis within the cell.

## Funding

This study was partially supported by the French National Research Agency, France (ANR) with the MCEC project of the reference ANR-17-CE05-0025.

[^2]: The selected optimal conditions from the [parametric study](https://www.sciencedirect.com/topics/engineering/parametric-study) were first applied to the process configuration, published previously in Ref. \[\]. These conditions led to a process efficiency of 63%. Since the pinch integration was not considered previously, it was relevant to address it with the novel model. The pinch integration is performed on coded software CERES. From this [pinch analysis](https://www.sciencedirect.com/topics/engineering/pinch-analysis), the process streams’ hot and cold composite curves and the grand composite curve are obtained, which are presented in **(a)** and **11(b)**, respectively. These curves aim to determine the minimum utility requirements of the system. The results revealed that the minimum heating utility required is zero kW, which is the upper gap between the red and blue curve in **(a)**, and the minimum cooling one is 115 kW, represented by the lower gap between the curves. According to the Pinch study, the process does not require any external heating source, which would result in an efficiency of 70.85%. In this scope, a python model built by Rupu YANG \[,\] during his Ph.D. thesis was used to determine the [heat exchanger network](https://www.sciencedirect.com/topics/engineering/heat-exchanger-network) of the process that may allow reaching the maximum possible efficiency of 70.85%. This code studies the different heating and cooling requirements proposes a series of heat exchanger network configurations, and selects the most flexible and cost-effective one.

![Fig. 11](https://ars.els-cdn.com/content/image/1-s2.0-S0360319923015690-gr11.jpg)

Download: Download high-res image (208KB)

[^3]: In summary, in this simulation, the MCEC operates at a power density of 0.082 W/cm <sup>2</sup> per cell, producing approximately 1.3 tons/day of methane gas ready for injection into the [natural gas network](https://www.sciencedirect.com/topics/engineering/natural-gas-network), where gas injection requirements in France are as follows: *<* 6% H <sub>2</sub>, *<* 2.5% CO <sub>2</sub>, *<* 2% CO, and a Wobbe Index between 49.1 and 56.52 MJ/m <sup>3</sup> \[\]. Besides, the overall process proves the efficiency of 68.87%, representing the total power produced over that consumed by the system (see ).

Table 3. Principle Results of the Power-to-Gas process simulation.

| Parameters | Value |
| --- | --- |
| Power Density | 0.082 W/cm <sup>2</sup> per cell |
| Number of Cells | 1428 cells |
| Total System Power | 1 MW |
| Methane Produced | 1.29 tonne/day |
| Methane Composition | 94.44% CH <sub>4</sub>, 3.15% H <sub>2</sub>, 2.2% CO <sub>2</sub>, 0.2% H <sub>2</sub> O, and traces of CO |
| Methane Wobbe Index | 50.9235 MJ/Nm <sup>3</sup> (at 0 °C and 1 atm standard conditions) |
| Process Efficiency | 68.87% |