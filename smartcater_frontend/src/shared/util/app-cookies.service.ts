import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../app-config';
import { defaultConstant } from '../constant/default-constant';

@Injectable({
  providedIn: 'root',
})
export class AppCookieService {
  private cookieStore: any = {};
  //   private _appConfig: any;
  requiredCookiesStorage: Array<string> = [];
  /**
   * @summary 6 hours expires
   */
  maxAgeInSeconds = 6 * 60 * 60;

  // Format the expiration date based on current time + maxAgeInSeconds
  expiresDate = new Date(
    Date.now() + this.maxAgeInSeconds * 1000
  ).toUTCString();

  constructor() {
    this.parseCookies();
    // this._appConfig = appConfig;
  }
  /**
   * It parse the cookie from string to JSON Array Object.
   * @param cookie
   * @returns void
   */
  private parseCookies(cookies = document.cookie): void {
    if (cookies === null) {
      return;
    }
    const cookiesArr = cookies.split(';');
    cookiesArr.forEach((cookie) => {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    });
  }

  /**
   * Sets a cookie with the specified key-value pair.
   * In production, the cookie is set with additional security attributes.
   *
   * @param {string} key - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @returns {void}
   */
  set(key: string, value: string): void {
    document.cookie = `${key}=${value}; Path=/; Max-Age=${this.maxAgeInSeconds}; Expires=${this.expiresDate};`;

    // if (this._appConfig.production) {
    //   document.cookie = `${key}=${value}; Path=/; Max-Age=${this.maxAgeInSeconds}; Expires=${this.expiresDate}; secure; SameSite=Strict`;
    // } else {
    //   document.cookie = `${key}=${value}; Path=/; Max-Age=${this.maxAgeInSeconds}; Expires=${this.expiresDate};`;
    // }
  }

  /**
   * Retrieves the value of a given key from the cookie store.
   * If the key does not exist or its value is null, it checks if the key is required in cookies storage.
   * If the key is required, it triggers a logout.
   *
   * @param {string} key - The key to retrieve the value of.
   * @returns {string | null} The value of the key in the cookie store, or null if the key does not exist or its value is null.
   */
  get(key: string): string | null {
    this.parseCookies();
    const cookieValue = this.cookieStore[key];
    if (cookieValue === null || cookieValue === undefined)
      this.isCookieRequired(key);
    return cookieValue || null;
  }

  isCookieRequired(key): void {
    if (this.requiredCookiesStorage.includes(key)) {
      this.logout();
    }
  }

  logout(): void {
    this.clearAllCookies();
  }

  clearAllCookies(): void {
    document.cookie = `${defaultConstant.USER_TOKEN}=;path=/;max-age=0`;
  }
  /**
   * Remove the cookie by providing key
   * @param {string} key
   * @returns void
   */
  remove(key: string): void {
    // To expire a cookie, we have to make the max age=0 and
    // provide path=/ to ensure we are deleting the correct cookie.
    document.cookie = `${key}=;path=/;max-age=0;`;
    delete this.cookieStore[key];
  }

  /**
   * Removes all cookies present in the current document.
   *
   * This method retrieves all cookies using the `getAllCookies` method, which returns an object
   * containing all cookies as key-value pairs. It then iterates over the keys of this object and
   * calls the `remove` method for each key to delete the corresponding cookie.
   *
   * The removal of cookies is achieved by setting their expiration date to the past and ensuring
   * that the path is set to `/` to match the path of the cookies.
   *
   * Note: This function will only remove cookies that are accessible from the current path and domain.
   * Cookies with different paths or domains will not be affected.
   *
   * @returns {void}
   *
   * @example
   * this.removeAll(); // Deletes all cookies present in the document
   *
   * @see {@link #remove} for the method that deletes individual cookies.
   * @see {@link #getAllCookies} for the method that retrieves all cookies.
   */
  removeAll(): void {
    const cookies = this.getAllCookies();
    const keys = Object.keys(cookies);
    for (const key of keys) {
      this.remove(key);
    }
  }

  /**
   * Sets the value of a given key in the cookie store to an encrypted value.
   *
   * @param {string} key - The key to set the value of.
   * @param {string} value - The value to set for the key.
   * @returns {void}
   */
  setEncryptedCookies(key: string, value: string): void {
    this.set(key, value);
  }

  /**
   * Retrieves the decrypted value of a given key from the cookie store.
   * If the key does not exist or its value is null, it checks if the key is required in local storage.
   * If the key is required, it triggers a logout.
   *
   * @param {string} key - The key to retrieve the decrypted value of.
   * @returns {string | null} The decrypted value of the key in the cookie store, or null if the key does not exist or its value is null.
   */
  getEncryptedCookies(key: string): string | null {
    this.parseCookies();
    // const cookieValue = this.encryptionUtil.decrypt(this.cookieStore[key]);
    return this.cookieStore[key] || null;
  }

  /**
   * Retrieves all cookies present in the current document and returns them as an object.
   *
   * This method reads the cookies from `document.cookie`, splits them into name-value pairs, and stores them
   * in an object where each key is a cookie name and each value is the corresponding cookie value.
   *
   * The cookies are parsed as follows:
   * - The `document.cookie` property is used to obtain a semicolon-separated string of cookies.
   * - Each cookie is split by the `=` character to separate the name and value.
   * - Leading spaces are trimmed from the cookie name and value.
   * - Cookie values are decoded using `decodeURIComponent` to handle special characters.
   * - Errors during decoding are logged to the console, but do not affect the processing of other cookies.
   *
   * @returns { { [key: string]: string } } An object where each key is a cookie name and each value is the corresponding cookie value.
   *
   * @example
   * const cookies = this.getAllCookies();
   * console.log(cookies); // Logs an object with all cookies
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
   */
  private getAllCookies(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const cookieString = document.cookie;

    if (cookieString) {
      const cookieArray = cookieString.split(';');
      for (const cookie of cookieArray) {
        // Trim leading spaces and split the name and value
        const [name, value] = cookie.split('=').map((part) => part.trim());
        if (name) {
          try {
            cookies[name] = decodeURIComponent(value || '');
          } catch (e) {
            console.error(`Error decoding cookie value for ${name}:`, e);
          }
        }
      }
    }
    return cookies;
  }
}
