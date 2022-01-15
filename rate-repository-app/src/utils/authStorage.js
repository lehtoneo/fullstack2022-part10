import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const token = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`,
    );

    return token ? JSON.parse(token) : undefined;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken),
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export const setAccessToken = async (accessToken) => {
  const storage = new AuthStorage();
  await storage.setAccessToken(accessToken);
  console.log("access token set");
  return accessToken;
};

export const getAccessToken = async () => {
  const storage = new AuthStorage();
  return await storage.getAccessToken();
};
