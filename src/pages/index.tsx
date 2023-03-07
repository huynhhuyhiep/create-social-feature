import Head from 'next/head'
import Form from "@/components/Form";
import Input from "@/components/Input";
import ContentWrapper from "@/components/ContentWrapper";
import styled from "@emotion/styled";
import tw from "twin.macro";
import TextArea from "@/components/TextArea";
import Checkbox from "@/components/Checkbox";
import RadioGroup from "@/components/RadioGroup";
import SelectTags from "@/components/SelectTags";
import BannerPicker from "@/components/BannerPicker";
import {createEvent} from "@/apis";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {CreateEventFieldValues} from "@/types";
import {parseStringToDateTime} from "@/utils";
import {FieldValues, SubmitHandler} from "react-hook-form";
import Button from "@/components/Button";

const StyledTitle = styled(TextArea)`
  ${tw`bg-purple outline-none px-[12px] py-[4px] mt-[32px]`}
  ${tw`text-[48px] leading-[60px] text-white font-bold`}
`
export default function Home() {
  const mutationEvent = useMutation({
    mutationFn: createEvent,
    onError: (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`)
      toast.error('My first toast onError')
    },
    onSuccess: (data, variables, context) => {
      toast.success('My first toast onSuccess')
    },
  })

  const onSubmit = (data: any) => {
    const {date, time, ...rest} = data
    mutationEvent.mutate({...rest, startAt: new Date(date + " " + time).toISOString()})
  }

  return (
    <>
      <Head>
        <title>Create social feature</title>
        <meta name="description" content="Webpage that allows users to create/host a new event/social"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <ContentWrapper>
        <Form onSubmit={onSubmit} className='flex flex-col'>
          <div tw='flex flex-row'>
            <div tw='w-[40%]'>
              <StyledTitle name="title" required rows={1}/>
              <div tw='columns-2 space-x-[20px]'>
                <Input label='Date' name="date" type='date' required tw='w-full'/>
                <Input label='Time' name="time" type='time' required tw='w-full'/>
              </div>
              <Input label='venue' name="venue" required tw='w-full'/>
              <div tw='columns-2 space-x-[20px]'>
                <Input label='capacity' name="capacity" type='number' required tw='w-full' min={0}/>
                <Input label='price' name="price" type='number' tw='w-full' min={0}/>
              </div>
            </div>
            <div tw='w-[60%] h-[445px]'>
              <BannerPicker label='Add a banner' required name='banner'/>
            </div>
          </div>
          <div tw='w-[50%] space-y-[32px]'>
            <TextArea label='Description' name='description' tw='w-full'/>
            <div>
              Setting
              <Checkbox name="isManualApprove" label='I want to approve attendees'/>
              <RadioGroup label='Privacy' name='privacy' options={['Public', 'Curated Audience', 'Community Only']}/>
              <SelectTags
                required
                name='tags'
                label='Tag your social'
                options={['Product', 'Marketing', 'Design', 'Engineering']}
              />
            </div>
            <Button type='submit' tw='w-full font-[500]'>Submit</Button>
          </div>
        </Form>
      </ContentWrapper>
    </>
  )
}
