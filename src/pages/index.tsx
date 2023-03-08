import Head from 'next/head'
import Form from "components/Form";
import Input from "components/Input";
import styled from "@emotion/styled";
import tw, {theme} from "twin.macro";
import TextArea from "components/TextArea";
import Checkbox from "components/Checkbox";
import RadioGroup from "components/RadioGroup";
import SelectTags from "components/SelectTags";
import BannerPicker from "components/BannerPicker";
import {createEvent} from "apis";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import Button from "components/Button";
import Icon from "components/Icon";
import {AxiosError} from "axios";

const StyledTitle = styled(TextArea)`
  ${tw`bg-purple outline-none px-[12px] py-[4px] mt-[32px]`}
  ${tw`text-[48px] leading-[60px] text-white font-bold rounded-none`}
`
export default function Home() {
  const {mutate, status} = useMutation({
    networkMode: 'always',
    mutationFn: createEvent,
    onError: (error: AxiosError, variables, context) => {
      toast.error(error?.message)
    },
    onSuccess: (data, variables, context) => {
      toast.success('Create Event successfully')
    },
  })

  const onSubmit = (data: any) => {
    const {date, time, ...rest} = data
    mutate({...rest, startAt: new Date(date + " " + time).toISOString()})
  }

  return (
    <>
      <Head>
        <title>Create social feature</title>
        <meta name="description" content="Webpage that allows users to create/host a new event/social"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Form
        onSubmit={onSubmit}
        tw='flex flex-col mt-[124px] mb-[100px]'
        defaultValues={{
          title: 'Untitled Event'
        }}
      >
        <div tw='flex justify-between'>
          <div tw='md:w-[49%] lg:w-[39%] relative'>
            <StyledTitle name="title" required rows={1} minRows={1} maxRows={3}/>

            <div tw='columns-2 space-x-[20px] my-[28px]'>
              <Input
                placeholder='Date'
                name="date" type='date'
                required
                tw='w-full rounded-[8px]'
                prefix={<Icon icon={'calendar'} size={33} color={theme('colors.darkblue')}/>}
              />
              <Input
                placeholder='Time'
                name="time"
                type='time'
                required
                tw='w-full rounded-[8px]'
                prefix={<Icon icon={'time'} size={33} color={theme('colors.darkblue')}/>}
              />
            </div>

            <Input
              placeholder='Venue'
              name="venue"
              required
              tw='w-full'
              prefix={<Icon icon={'locate'} size={16} color={theme('colors.darkblue')}/>}
            />

            <div tw='columns-2 space-x-[20px] mt-[12px] w-[90%]'>
              <Input
                placeholder='Max capacity'
                name="capacity"
                type='number'
                required
                tw='w-full'
                min={0}
                prefix={<Icon icon={'users'} size={16} color={theme('colors.darkblue')}/>}
              />
              <Input
                placeholder='Cost per person'
                name="price"
                type='number'
                required
                tw='w-full'
                min={0}
                prefix={<Icon icon={'money'} size={16} color={theme('colors.darkblue')}/>}
              />
            </div>
          </div>
          <div tw='md:w-[49%] lg:w-[60%] h-[445px]'>
            <BannerPicker
              label={
                <div tw='flex justify-center items-center text-darkblue font-[500] text-[20px] space-x-[16px]'>
                  <Icon icon={'picture'} size={24}/>
                  <div>Add a banner</div>
                </div>
              }
              required
              name='banner'
            />
          </div>
        </div>
        <div tw='w-[50%] space-y-[32px]'>
          <TextArea
            minRows={8}
            maxRows={20}
            label='Description'
            name='description'
            tw='w-full'
            placeholder='Description of your event..'
          />

          <div tw='bg-white rounded-[20px] p-[32px] space-y-[24px]'>
            <div tw='px-[12px] bg-yellow text-purple font-[700] text-[32px] leading-[60px] w-fit'>
              Settings
            </div>

            <Checkbox name="isManualApprove" label='I want to approve attendees'/>
            <RadioGroup
              label='Privacy'
              required
              name='privacy'
              options={['Public', 'Curated Audience', 'Community Only']}
            />

            <div>
              <div tw='text-gray-700 text-[16px] font-[500]'>Tag your social</div>
              <div tw='text-gray-600 text-[16px]'>Pick tags for our curation engine to work its magin</div>
            </div>

            <SelectTags
              required
              name='tags'
              options={['Product', 'Marketing', 'Design', 'Engineering']}
            />
          </div>

          <Button
            type='submit'
            tw='w-full font-[500]'
            disabled={status === 'loading'}
            throttleDuration={500}
          >
            CREATE SOCIAL
          </Button>
        </div>
      </Form>
    </>
  )
}
