import Head from 'next/head'
import styled from "@emotion/styled";
import tw, {css, theme} from "twin.macro";
import Icon from "components/Icon";
import {EventDetail} from "types/apis";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

const StyledTitle = styled.h1`
  ${tw`w-[120%] text-[48px] font-[700] leading-[60px] text-white`}
  span {
    ${tw`bg-purple`}
  }
`

const StyledIconContent = styled.div`
  ${tw`flex items-center space-x-[15px] text-gray-1 font-[600]`}
`

const StyledDescription = styled.p`
  ${tw`text-gray-1 font-[400] text-[18px] leading-[28px]`}
  line-break: auto;
  white-space: pre-line
`
export default function Detail({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {title, startAt, venue, capacity, price, description, banner} = data;

  return (
    <>
      <Head>
        <title>Event Detail</title>
        <meta name="description" content="Webpage that allows users to create/host a new event/social"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div tw='flex justify-between mt-[100px] mb-[30px]'>
        <div tw='md:w-[49%] lg:w-[39%] relative z-10'>
          <StyledTitle><span>{title}</span></StyledTitle>

          <div tw='columns-2 space-x-[20px] my-[28px]'>
            <StyledIconContent>
              <Icon icon={'calendar'} size={33} color={theme('colors.darkblue')}/>
              <div tw='text-[28px]'>{dayjs(startAt).format('MMMM D, ddd')}</div>
            </StyledIconContent>
            <StyledIconContent>
              <Icon icon={'time'} size={33} color={theme('colors.darkblue')}/>
              <div tw='text-[28px]'>{dayjs(startAt).format('h A')}</div>
            </StyledIconContent>
          </div>

          <StyledIconContent tw='mt-[28px]'>
            <Icon icon={'locate'} size={16} color={theme('colors.darkblue')}/>
            <div tw='text-[16px]'>{venue}</div>
          </StyledIconContent>

          <div tw='flex space-x-[30px] mt-[12px]'>
            <StyledIconContent>
              <Icon icon={'users'} size={16} color={theme('colors.darkblue')}/>
              <div tw='text-[16px]'>{capacity} people</div>
            </StyledIconContent>

            <StyledIconContent>
              <Icon icon={'money'} size={16} color={theme('colors.darkblue')}/>
              <div tw='text-[16px]'>${price}</div>
            </StyledIconContent>
          </div>
        </div>
        <div tw='relative md:w-[49%] lg:w-[60%] h-[445px] overflow-hidden' css={css`border-radius: 0 64px`}>
          <Image
            style={{objectFit: 'cover'}}
            fill
            src={banner}
            alt="Image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div tw='w-[50%] mb-[200px]'>
        <StyledDescription css={css`line-break: auto`}>{description}</StyledDescription>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ data: EventDetail }> = async (context) => {
  const {params} = context;
  const res = await axios.get(`https://api.supermomos-dev.com/interview/social/${params?.id}`)

  if (!res?.data) {
    return {
      notFound: true,
    }
  }
  // Pass data to the page via props
  return {props: {data: res.data}}
}
