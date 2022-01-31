//import {GetServerSideProps} from 'next'; Modo 1 SSR
import {GetStaticProps} from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

//SSR  - Conceito de Server Side Rendering SSR que estamos utilizando para consumir a API de formas de pagamento
//Pode ter um impact de demorar um pouco para atualizar a pagina enquanto espera o retorno da API
//SSR é mais Dinamico caso eu queira renderizar algo pessoal com onome do cliente por exemplo

//SSG  - Conceito de Static Server Generations é um conceito para o Next salvar um HTML da pagina de requisição
//durante um período estipulado para não precisar ficar fazendo uma requisição a todo o momento
//Na função de chamada a API é só trocar getServerSideProps por getStaticProps
//SSG é mais performatico
interface HomeProps{
  product:{
    priceId: string;
    amount:number;
  }
}
export default function Home({product}:HomeProps) {
  return (
    <>
      {/**Jogo Head aqui para cada pagina ter o seu Head ele ira compor o Head do app no Document*/}
      <Head>
        <title>Inicio | ig.News</title>
      </Head>
        <main className={styles.contentContainer}>      
          <section className={styles.hero}>
            <span> 👏 Hey, welcome</span>
            <h1>news about the <span>React</span> world.</h1>
            <p>
              Get acces to all the publications <br />
              <span>For {product.amount} month</span>
            </p>
            <SubscribeButton priceId={product.priceId} />
          </section>
          <img src="/images/avatar.svg" alt="Girl coding" />
        </main>
    </>
  )
}
//Necessário sempre esta constante ter o nome getServerSideProps e falo que esta função tem o formato da 
//tipagem declarada lá em cima GetServerSideProps
//Instalar yarn add stripe

//Modo de chamada 1 - modelo SSR
//export const getServerSideProps: GetServerSideProps = async()=>{

//Modo de chamada 2 - modelo SSG
export const getStaticProps: GetStaticProps = async()=>{
  const price = await stripe.prices.retrieve('price_1KMrqGD9qq72BnKbv4AD65R7',{
    expand: ['product']    
  })

  const product = {
    //stripe.com/docs/api/prices/retrieve
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style:'currency',
      currency:'USD'
    }).format( price.unit_amount / 100 ), //o preço vem sempre em centavos
  };

  return{
    /* Tudo o que eu retorno de Props aqui é carregado na função da pagina acima
    export default function Home(props) 
    ex.:
    props:{
      nome:'Andre'
    }*/
    props:{
      product,
    },
    revalidate: 60*60*24, // 24hs
  }
}
