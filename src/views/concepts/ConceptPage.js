import React from 'react';

import BlueLinkButton from 'shared/buttons/BlueLinkButton';
import Accordion from '../../shared/accordion/Accordion';
import styles from './ConceptPage.module.scss';
import { appRoutes } from 'constants.js';

export default () => {
  return (
    <div className={styles.Container}>
      <BlueLinkButton
        to={appRoutes.HOME}
        text="Terug naar kaart"
        chevronDirection="left"
      />
      <h1>Begrippenlijst</h1>
      <p className={styles.Intro}>
        Op de WBA kaart staan alle locaties die Werkgroep Blackspots in
        onderzoek en/of uitvoering heeft. Naar aanleiding van onderzoek wordt
        besloten of maatregelen nodig zijn om de verkeersveiligheid te
        verbeteren. In deze lijst worden alle begrippen die op de kaart worden
        gebruikt uitgelegd.
      </p>

      <h2>Werkgroep Blackspots Amsterdam</h2>
      <p>
        De Werkgroep Blackspots Amsterdam (WBA) is het expertteam van de
        gemeente Amsterdam op het gebied van het verkeersveilig maken van
        verkeersonveilige locaties. De werkgroep onderzoekt en geeft advies over
        locaties waar ernstige of dodelijke ongevallen zijn gebeurd. Ook
        locaties waar het vermoeden van verkeersonveiligheid bestaat kunnen op
        verzoek door de werkgroep worden beoordeeld. Op basis van onderzoek en
        advies kunnen maatregelen worden genomen.
      </p>
      <Accordion
        title="Blackspot"
        text="Het programma Verkeersveiligheid laat jaarlijks een overzicht
        opstellen van de blackspots in de stad. De Werkgroep Blackspots
        Amsterdam (WBA) heeft hierin een onderzoeks-, advies- en toetsingsrol
        en werkt samen met de juridisch wegbeheerder bij de aanpak van
        blackspots.In Amsterdam is een blackspot een locatie met 3 of meer
        letstelongevallen in 3 jaar tijd."
      />
      <Accordion
        title="Red route"
        text="In Amsterdam wordt, in navolging van Londen, de term
        ‘Red Routes’ gebruikt voor wegvakken waar veel verkeersongevallen
        plaatsvinden. Een gangbare definitie van een Red Route is een wegvak
        waar meer dan 30 ongevallen met als afloop letsel of dodelijke
        slachtoffers per km over 3 jaar hebben plaatsgevonden."
      />
      <Accordion
        title="Protocol locatie"
        text="Na elk dodelijk ongeval wordt door de WBA een onderzoek gedaan
        naar de infrastructuur. Ook na ernstige ongevallen die door de politie
        aan de WBA worden voorgelegd gebeurd dit conform het protocol
        afhandeling verkeersongevallen met dodelijke en ernstige afloop.
        Indien nodig worden na een onderzoek versneld aanpassingen gedaan
        aan deinfrastructuur om de verkeersveiligheid te verbeteren."
      />
      <Accordion
        title="Risicolocatie"
        text="Dit zijn alle locaties die als verkeersonveilig gemeld zijn
        door bewoners, ondernemers en gebiedsteams. De locaties die objectief
        onveilige kenmerken bevatten worden nader onderzocht door de WBA. Op
        basis van een rapportage kan de wegbeheerder de nodigeinfrastructurele
        aanpassingen uitvoeren."
      />
      <Accordion
        title="In onderzoek"
        text="Een locatie met de status “in onderzoek”  ligt bij een
        verkeersontwerper vanR&D in opdracht van de WBA. Er wordt gezocht naar
        aanpassingen die de verkeersveiligheid verbeteren. Deze aanpassingen
        worden uitgewerkt tot een verkeersontwerp. Wanneer de WBA akkoord is,
        wordt het ontwerp voorgelegd aan de Centrale Verkeerscommissie (CVC).
        Als het ontwerp wordt goedgekeurd door de CVC is de fase “onderzoek”
        afgerond."
      />
      <Accordion
        title="In voorbereiding"
        text="Een locatie met de status “in voorbereiding” is door de WBA
        overgedragen aan een team van het IB gespecialiseerd in de
        voorbereiding van inframaatregelen verkeersveiligheid.  Het team zorgt
        in opdracht van het programma Verkeersveiligheid voor een snelle
        doorlooptijd  van de voorbereiding en een uitvoeringsdatum op korte
        termijn."
      />
      <Accordion
        title="In uitvoering"
        text="Een locatie met de status “in uitvoering” is door het
        voorbereidingsteam  IB overgedragen aan de aannemer. Er wordt  aan de
        inframaatregel op straat  gewerkt om de verkeersveiligheid te
        verbeteren."
      />
      <Accordion
        title="Gereed"
        text="Een locatie heeft de status  “gereed”  op het moment dat de
        uitvoering geheel is afgerond en opgeleverd aan de wegbeheerder."
      />
      <Accordion
        title="Geen maatregel"
        text="Het kan voorkomen dat bij een
      onderzoek op een locatie waar een verkeersongeval heeft plaatsgevonden
      wordt vastgesteld dat er geen inframaatregelen mogelijk en/of nodig zijn.
      De oorzaak van het ongeval heeft dan een andere oorzaak, zoals gedrag in
      het verkeer."
      />
    </div>
  );
};
