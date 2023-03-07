import React, {memo, ReactNode, useEffect, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import tw, {css} from "twin.macro";
import Modal from "@/components/Modal";
import Image from 'next/image'

export interface BannerPickerProps {
  name: string;
  label?: ReactNode;
  required?: boolean;
}

const IMAGE_PICKER = [
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg'
]

const styles = (isSelected: boolean) => css`
  ${tw`relative bg-red-200 w-full cursor-pointer hover:scale-[105%] transition h-[100px]`}
  ${isSelected && tw`border-4 border-yellow`}
`;

function Picker({label, value, onChange}: { label?: ReactNode, value: string, onChange: (value: string) => void }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState('');

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        css={css`
          ${tw`w-full h-full relative overflow-hidden`}
          background: rgba(242, 242, 242, 0.1);
          border: 1px dashed #F2F2F2;
          border-radius: 0 64px;
        `}
      >
        {!value ? label : <Image
          style={{objectFit: 'cover'}}
          fill
          src={value}
          alt="Image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />}
      </button>

      <Modal
        title='Choose a banner'
        open={modalIsOpen}
        onOk={() => {
          onChange(selectedBanner)
          setIsOpen(false)
        }}
        onCancel={() => {
          setIsOpen(false)
          setSelectedBanner('')
        }}
      >
        <div tw='grid grid-cols-6 gap-4 w-full max-w-[1200px]'>
          {IMAGE_PICKER.map((item, index) => {
            return (
              <div
                css={styles(item === selectedBanner)}
                key={`${item}-${index}`}
                onClick={() => setSelectedBanner(item)}
              >
                <Image
                  style={{objectFit: 'cover'}}
                  fill
                  src={item}
                  alt="Image"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
                />
              </div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

function BannerPicker({label, name, required, ...rest}: BannerPickerProps) {
  const {control, formState: {errors}} = useFormContext();

  return (
    <div tw='w-full h-full'>
      <Controller
        name={name}
        rules={{required}}
        control={control}
        render={({field: {onChange, onBlur, name, value, ref}}) => {
          return (
            <Picker value={value} onChange={onChange} label={label}/>
          )
        }}
      />
      {errors[name] && <ErrorMessage>This is required</ErrorMessage>}
    </div>
  );
}

export default memo(BannerPicker);
