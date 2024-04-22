import { Linking } from 'react-native';
import InAppBrowserClassMethods from 'react-native-inappbrowser-reborn';

export async function openInBrowser(url, options) {
  try {
    if (!/^https?:\/\//.test(url)) throw new Error('No http');
    const isAvailable = await InAppBrowserClassMethods.isAvailable();
    if (!isAvailable) throw new Error('No available');
    InAppBrowserClassMethods.open(url, options);
  } catch (err) {
    Linking.openURL(url);
  }
}
