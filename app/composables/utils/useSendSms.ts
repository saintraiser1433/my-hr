export const useSms = () => {
  const { $api, $toast } = useNuxtApp()

  const sendSmsRepo = repository<SendMessage>($api, "/sms/send");
  const send = async (message: string, numbers: string) => {
    try {

      const formattedNumber = validatePhNumber(numbers);
      const response = await sendSmsRepo.add({
        message: message,
        phoneNumbers: [formattedNumber]
      })
      return response
    } catch (error: any) {
      throw error
    }
  }

  const validatePhNumber = (number: string): string => {
    const digits = number.replace(/\D/g, '');
    if (!/^9\d{9}$/.test(digits)) {
      throw createError({
        statusCode: 400,
        message: `Invalid PH number: ${number}`
      });
    }
    return `+63${digits}`;
  };

  return { send }
}