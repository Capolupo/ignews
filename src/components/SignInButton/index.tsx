import {FaGithub} from 'react-icons/fa';
import styles from './styles.module.scss';
import {FiX} from 'react-icons/fi';

export function SignInButton() {

    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button 
            type="button"
            className={styles.signInButton}
        >

            <FaGithub color="#04d361"/>
            Andre
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
            type="button"
            className={styles.signInButton}
        > 

            <FaGithub color='#eba417'/>
            SignIn with GitHub
        </button>
    );
    /*
    return(
        <button 
            type="button"
            className={styles.signInButton}
        >

            <FaGithub color='#eba417'/>
            SignIn with GitHub
        </button>
    );*/
}