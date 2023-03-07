import Head from 'next/head'
import {Inter} from 'next/font/google'
import Form from "@/components/Form";
import Input from "@/components/Input";

const inter = Inter({subsets: ['latin']})

export default function Home() {
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Head>
        <title>Create social feature</title>
        <meta name="description" content="Webpage that allows users to create/host a new event/social"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={inter.className}>
        <Form onSubmit={onSubmit}>
          <Input label='First Name' name="firstName" required className='bg-red-500'/>
          <Input label='Date' name="date" type='date' required className='bg-red-500'/>
          <Input label='check' name="checkcc" type='checkbox' required className='bg-red-500'/>
          <Input label='check' name="checkcdddc" type='radio' value='abc' required className='bg-red-500'/>
          <button>Submit</button>
        </Form>
      </main>
    </>
  )
}
