import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

interface EmailData {
  subject?: string;
  body?: string;
  recipients?: string[];
}

export type InquiryCategory = 
  | '일반문의' 
  | '업체문의' 
  | '음식점 제보하기' 
  | '영양정보요청' 
  | '앱 불편신고';

export const INQUIRY_CATEGORIES: InquiryCategory[] = [
  '일반문의',
  '업체문의',
  '음식점 제보하기',
  '영양정보요청',
  '앱 불편신고'
];

const getEmailTemplate = (category: InquiryCategory, details: string) => {
  const baseInfo = `
---------------------
앱 버전: ${require('../app.json').expo.version}
기기 정보: ${Platform.OS} ${Platform.Version}`;

  switch (category) {
    case '일반문의':
      return `
안녕하세요, 고단백 고객센터입니다.

문의 유형: 일반문의
문의 내용: ${details}
${baseInfo}`;

    case '업체문의':
      return `
안녕하세요, 고단백 고객센터입니다.

문의 유형: 업체문의
업체명: 
담당자명: 
연락처: 

문의 내용: ${details}
${baseInfo}`;

    case '음식점 제보하기':
      return `
안녕하세요, 고단백 고객센터입니다.

문의 유형: 음식점 제보하기
음식점명: 
위치(주소): 
메뉴 정보: 

제보 내용: ${details}
${baseInfo}`;

    case '영양정보요청':
      return `
안녕하세요, 고단백 고객센터입니다.

문의 유형: 영양정보요청
음식점명: 
메뉴명: 
요청사항: ${details}

※ 영양정보 요청은 음식점 사장님의 협조가 필요한 사항입니다.
   요청하신 정보는 검토 후 순차적으로 반영될 예정입니다.
${baseInfo}`;

    case '앱 불편신고':
      return `
안녕하세요, 고단백 고객센터입니다.

문의 유형: 불편신고
발생 일시: 
발생 화면: 
재현 방법: 

불편 내용: ${details}

※ 신고하신 내용은 확인 후 다음 업데이트에 반영하도록 하겠습니다.
${baseInfo}`;

    default:
      return `
안녕하세요, 고단백 고객센터입니다.

문의 내용: ${details}
${baseInfo}`;
  }
};

export const sendEmail = async ({
  subject = '고단백 문의하기',
  body = '',
  recipients = ['contact@protein.com'],
}: EmailData = {}) => {
  try {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const encodedRecipients = encodeURIComponent(recipients.join(','));

    const mailtoUrl = `mailto:${encodedRecipients}?subject=${encodedSubject}&body=${encodedBody}`;
    
    const canOpen = await Linking.canOpenURL(mailtoUrl);
    
    if (!canOpen) {
      throw new Error('메일 앱을 찾을 수 없습니다.');
    }

    await Linking.openURL(mailtoUrl);
    return 'sent';
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error);
    throw error;
  }
};

export const composeCustomerServiceEmail = async (
  category: InquiryCategory,
  details: string = ''
) => {
  const subject = `[${category}] 고단백 문의하기`;
  const body = getEmailTemplate(category, details).trim();

  return sendEmail({
    subject,
    body,
    recipients: ['contact@protein.com']
  });
}; 