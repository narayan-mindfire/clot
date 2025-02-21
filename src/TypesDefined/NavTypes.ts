import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
    Welcome : undefined,
    Explore: undefined,
    Homepage: undefined,
    Signin : undefined,
    Signup: undefined,
}

export type WelcomeParams = NativeStackScreenProps<RootStackParamList, 'Welcome'>
export type ExploreParams = NativeStackScreenProps<RootStackParamList, 'Explore'>
export type HomepageParams = NativeStackScreenProps<RootStackParamList, 'Homepage'>
export type SigninParams = NativeStackScreenProps<RootStackParamList, 'Signin'>
export type SignupParams = NativeStackScreenProps<RootStackParamList, 'Signup'>