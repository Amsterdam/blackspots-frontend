import React from 'react';
import auth from 'shared/auth/auth';
import styles from './LandingPage.module.scss';
import logo from 'assets/media/amsterdam-logo.svg';
import headerImage from 'assets/media/main-header-blur.jpg';
import Footer from '../../components/footer/Footer';

const LandingPage = () => {
  const login = () => auth.keycloak.login();

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.Header}>
          <img src={logo} className={styles.Logo} alt="Amsterdam logo" />
          <h1>Werkgroep Blackspots</h1>
        </div>
        <div className={styles.Menu} />
        <div className={styles.HeroContainer}>
          <img alt="Hero" src={headerImage} className={styles.Hero} />
        </div>
        <div className={styles.Section}>
          <h1> Welkom bij Werkgroep Blackspots</h1>
          <p className={styles.Intro}>
            De kaart bevat een overzicht van de Blackspots, Red Routes
            (wegvakken), Protocol locaties (ernstig en dodelijk) en
            Risicolocaties vanaf 2014 tot heden. Elke locatie op de kaart is
            voorzien van een status vanaf onderzoek t/m uitvoering gereed of
            geen maatregel. Deze kaart is een weergave van locaties die door de
            WBA zijn of worden onderzocht. Het is nadrukkelijk geen
            ongevallenkaart.
            <br />
            <br /> Voor meer informatie over de Werkgroep Blackspots ga naar:{' '}
            <a
              href="http://amsterdam.nl/verkeersveiligheid"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://amsterdam.nl/verkeersveiligheid
            </a>
          </p>
          <h2>Inloggen</h2>
          <button onClick={login} className={styles.LoginBtn}>
            Datapunt account
          </button>
          <p>
            Je hebt hiervoor een account nodig. Heb je die niet? Heb je vragen
            en/of suggesties?
            <br /> Stuur dan een email naar{' '}
            <a href="mailto:WBAkaart.V&OR@amsterdam.nl">
              WBAkaart.V&OR@amsterdam.nl
            </a>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
