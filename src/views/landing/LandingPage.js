import React from 'react';
import auth from 'shared/auth/auth';
import styles from './LandingPage.module.scss';
import logo from 'assets/media/amsterdam-logo.svg';
import hero from 'assets/media/main-header-hero-default.png';

export default () => {
  function login() {
    auth.keycloak.login();
  }
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <img src={logo} className={styles.Logo} alt="Amsterdam logo" />
        <h1>Werkgroepblackspots</h1>
      </div>
      <div className={styles.HeroContainer}>
        <img alt="Hero" src={hero} className={styles.Hero} />
      </div>
      <div className={styles.Content}>
        <h1> Welkom bij Werkgroepblackspots</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <h2>Inloggen</h2>
        <button onClick={login} className={styles.LoginBtn}>
          Datapunt account
        </button>
        <p>
          Account Aanvragen?
          <br />
          Neem contact op met{' '}
          <a href="mailto:e.van.den.bout@amsterdam.nl">Elsbeth van den Bout</a>
        </p>
      </div>
    </div>
  );
};
