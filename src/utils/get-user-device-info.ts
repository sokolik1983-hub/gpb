import { getDeviceInfo } from '@platform/services';

const FAKE_DATA = 'fake';

/**
 * Возвращает мак-адрес и отпечаток устройства.
 */
export const getUserDeviceInfo = async () => {
  const deviceInfo = await getDeviceInfo();

  // 'fake' добавлено для того, чтобы при разработке локально с заглушкой криптоплагина
  // эти поля были хоть чем-то заполнены, т.к. они обязательные
  return {
    macAddress: deviceInfo.macAddress.length > 0 ? deviceInfo?.macAddress[0] : FAKE_DATA,
    deviceDigitalPrint: deviceInfo.devicePrint || FAKE_DATA,
  };
};
