import {
  SampleImage,
  SampleBackCouponImage,
  Cafe,
  Coupon,
  CouponDesign,
  IssuedCoupon,
  Reward,
  Customer,
} from '.';
import { CustomerPhoneNumber } from './index';

export interface SampleCouponRes {
  sampleFrontImages: SampleImage[];
  sampleBackImages: SampleBackCouponImage[];
  sampleStampImages: SampleImage[];
}

export interface CafeRes {
  cafes: Cafe[];
}

export interface CouponSettingReqBody extends CouponDesign {
  reward: string;
  expirePeriod: number;
  maxStampCount: number;
}

export interface StampEarningReqBody {
  earningStampCount: number;
}

export interface CafeInfoReqBody {
  openTime: string;
  closeTime: string;
  telephoneNumber: string;
  cafeImageUrl: string;
  introduction: string;
}

export interface CafeRegisterReqBody {
  businessRegistrationNumber: string;
  name: string;
  roadAddress: string;
  detailAddress: string;
}

export interface RewardRes {
  rewards: Reward[];
}

export interface IsFavoritesReqBody {
  isFavorites: boolean;
}

export interface CouponRes {
  coupons: Coupon[];
}

export interface CustomerPhoneNumberRes {
  customer: CustomerPhoneNumber[];
}

export interface IssueCouponRes {
  couponId: number;
}

export interface IssuedCouponsRes {
  coupons: IssuedCoupon[];
}

export interface RewardReqBody {
  cafeId: number;
  used: boolean;
}

export interface CustomersRes {
  customers: Customer[];
}

export interface IssueCouponReqBody {
  cafeId: number;
}

export interface RegisterUserReqBody {
  phoneNumber: string;
}

export interface MutateReq<T = unknown, K = unknown> {
  body: T;
  params?: K;
}

export interface QueryReq<K = unknown> {
  params?: K;
}

export interface CustomerIdParams {
  customerId: number;
}

export interface CouponIdParams {
  couponId: number;
}

export interface CafeIdParams {
  cafeId: number;
}

export interface RewardIdParams {
  rewardId: number;
}

export interface PhoneNumberParams {
  phoneNumber: string;
}

export interface MaxStampCountParams {
  maxStampCount: number;
}
