import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                {/**No Next não precisa importar a imagem... seguir o padrao abaixo */}
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}