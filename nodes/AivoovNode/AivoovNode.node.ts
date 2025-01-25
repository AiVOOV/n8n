import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
const country = [
	{ name: 'Afrikaans (South Africa)', value: 'af-ZA' },
	{ name: 'Albanian (Albania)', value: 'sq-AL' },
	{ name: 'Algeria', value: 'ar-DZ' },
	{ name: 'Amharic', value: 'am-ET' },
	{ name: 'Arabic (Egypt)', value: 'ar-EG' },
	{ name: 'Arabic (Gulf)', value: 'ar-AE' },
	{ name: 'Arabic (Iraq)', value: 'ar-IQ' },
	{ name: 'Arabic (Jordan)', value: 'ar-JO' },
	{ name: 'Arabic (Kuwait)', value: 'ar-KW' },
	{ name: 'Arabic (Lebanon)', value: 'ar-LB' },
	{ name: 'Arabic (Libya)', value: 'ar-LY' },
	{ name: 'Arabic (Morocco)', value: 'ar-MA' },
	{ name: 'Arabic (Oman)', value: 'ar-OM' },
	{ name: 'Arabic (Qatar)', value: 'ar-QA' },
	{ name: 'Arabic (Saudi Arabia)', value: 'ar-SA' },
	{ name: 'Arabic (Syria)', value: 'ar-SY' },
	{ name: 'Arabic (Tunisia)', value: 'ar-TN' },
	{ name: 'Arabic (Yemen)', value: 'ar-YE' },
	{ name: 'Armenian (Armenia)', value: 'hy-AM' },
	{ name: 'Assamese (India)', value: 'as-IN' },
	{ name: 'Azerbaijani (Azerbaijan)', value: 'az-AZ' },
	{ name: 'Bahrain', value: 'ar-BH' },
	{ name: 'Basque', value: 'eu-ES' },
	{ name: 'Bengali (Bangladesh)', value: 'bn-BD' },
	{ name: 'Bengali (India)', value: 'bn-IN' },
	{ name: 'Bosnian (Bosnia and Herzegovina)', value: 'bs-BA' },
	{ name: 'Bulgarian (Bulgaria)', value: 'bg-BG' },
	{ name: 'Burmese (Myanmar)', value: 'my-MM' },
	{ name: 'Catalan (Spain)', value: 'ca-ES' },
	{ name: 'Chinese (Cantonese, Simplified)', value: 'yue-CN' },
	{ name: 'Chinese (Hong Kong)', value: 'yue-HK' },
	{ name: 'Chinese (Jilu Mandarin, Shandong)', value: 'zh-CN-shandong' },
	{ name: 'Chinese (Mainland China)', value: 'cmn-CN' },
	{ name: 'Chinese (Mandarin, Simplified)', value: 'zh-CN-sichuan' },
	{ name: 'Chinese (Southwestern Mandarin, Simplified)', value: 'zh-CN-liaoning' },
	{ name: 'Chinese (Taiwan)', value: 'cmn-TW' },
	{ name: 'Chinese (Wu, Simplified)', value: 'wuu-CN' },
	{ name: 'Chinese (Zhongyuan Mandarin Henan)', value: 'zh-CN-henan' },
	{ name: 'Chinese (Zhongyuan Mandarin Shaanxi)', value: 'zh-CN-shaanxi' },
	{ name: 'Croatian (Croatia)', value: 'hr-HR' },
	{ name: 'Czech (Czech Republic)', value: 'cs-CZ' },
	{ name: 'Danish (Denmark)', value: 'da-DK' },
	{ name: 'Dutch (Belgium)', value: 'nl-BE' },
	{ name: 'Dutch (Netherlands)', value: 'nl-NL' },
	{ name: 'English (Australia)', value: 'en-AU' },
	{ name: 'English (Canada)', value: 'en-CA' },
	{ name: 'English (Hong Kong)', value: 'en-HK' },
	{ name: 'English (India)', value: 'en-IN' },
	{ name: 'English (Ireland)', value: 'en-IE' },
	{ name: 'English (Kenya)', value: 'en-KE' },
	{ name: 'English (New Zealand)', value: 'en-NZ' },
	{ name: 'English (Nigeria)', value: 'en-NG' },
	{ name: 'English (Philippines)', value: 'en-PH' },
	{ name: 'English (Singapore)', value: 'en-SG' },
	{ name: 'English (South Africa)', value: 'en-ZA' },
	{ name: 'English (Tanzania)', value: 'en-TZ' },
	{ name: 'English (UK)', value: 'en-GB' },
	{ name: 'English (US)', value: 'en-US' },
	{ name: 'Estonian (Estonia)', value: 'et-EE' },
	{ name: 'Filipino (Philippines)', value: 'fil-PH' },
	{ name: 'Finnish (Finland)', value: 'fi-FI' },
	{ name: 'French (Belgium)', value: 'fr-BE' },
	{ name: 'French (Canada)', value: 'fr-CA' },
	{ name: 'French (France)', value: 'fr-FR' },
	{ name: 'French (Switzerland)', value: 'fr-CH' },
	{ name: 'Galician (Spain)', value: 'gl-ES' },
	{ name: 'Georgian (Georgia)', value: 'ka-GE' },
	{ name: 'German (Austria)', value: 'de-AT' },
	{ name: 'German (Germany)', value: 'de-DE' },
	{ name: 'German (Switzerland)', value: 'de-CH' },
	{ name: 'Greek (Greece)', value: 'el-GR' },
	{ name: 'Gujarati (India)', value: 'gu-IN' },
	{ name: 'Hebrew (Israel)', value: 'he-IL' },
	{ name: 'Hindi (India)', value: 'hi-IN' },
	{ name: 'Hungarian (Hungary)', value: 'hu-HU' },
	{ name: 'Icelandic', value: 'is-IS' },
	{ name: 'Indonesian (Indonesia)', value: 'id-ID' },
	{ name: 'Inuktitut (Canada)', value: 'iu-Cans-CA' },
	{ name: 'Inuktitut Canada', value: 'iu-Latn-CA' },
	{ name: 'Irish Gaelic', value: 'ga-IE' },
	{ name: 'Italian (Italy)', value: 'it-IT' },
	{ name: 'Japanese (Japan)', value: 'ja-JP' },
	{ name: 'Javanese (Indonesia)', value: 'jv-ID' },
	{ name: 'Kannada (India)', value: 'kn-IN' },
	{ name: 'Kazakhstan', value: 'kk-KZ' },
	{ name: 'Khmer (Cambodia)', value: 'km-KH' },
	{ name: 'Korean (South Korea)', value: 'ko-KR' },
	{ name: 'Lao (Laos)', value: 'lo-LA' },
	{ name: 'Latvian (Latvia)', value: 'lv-LV' },
	{ name: 'Lithuanian (Lithuania)', value: 'lt-LT' },
	{ name: 'Macedonian (Republic of North Macedonia)', value: 'mk-MK' },
	{ name: 'Malay (Malaysia)', value: 'ms-MY' },
	{ name: 'Malayalam (India)', value: 'ml-IN' },
	{ name: 'Maltese (Malta)', value: 'mt-MT' },
	{ name: 'Marathi (India)', value: 'mr-IN' },
	{ name: 'Mongolian (Mongolia)', value: 'mn-MN' },
	{ name: 'Nepali (Nepal)', value: 'ne-NP' },
	{ name: 'Norwegian (Norway)', value: 'nb-NO' },
	{ name: 'Oriya (India)', value: 'or-IN' },
	{ name: 'Pashto (Afghanistan)', value: 'ps-AF' },
	{ name: 'Persian (Iran)', value: 'fa-IR' },
	{ name: 'Polish (Poland)', value: 'pl-PL' },
	{ name: 'Portuguese (Brazil)', value: 'pt-BR' },
	{ name: 'Portuguese (Portugal)', value: 'pt-PT' },
	{ name: 'Punjabi (India)', value: 'pa-IN' },
	{ name: 'Romanian', value: 'ro-RO' },
	{ name: 'Russian (Russia)', value: 'ru-RU' },
	{ name: 'Serbian (Serbia)', value: 'sr-RS' },
	{ name: 'Sinhala (Sri Lanka)', value: 'si-LK' },
	{ name: 'Slovak (Slovakia)', value: 'sk-SK' },
	{ name: 'Slovenian (Slovenia)', value: 'sl-SI' },
	{ name: 'Somali (Somalia)', value: 'so-SO' },
	{ name: 'Spanish (Argentina)', value: 'es-AR' },
	{ name: 'Spanish (Bolivia)', value: 'es-BO' },
	{ name: 'Spanish (Chile)', value: 'es-CL' },
	{ name: 'Spanish (Colombia)', value: 'es-CO' },
	{ name: 'Spanish (Costa Rica)', value: 'es-CR' },
	{ name: 'Spanish (Cuba)', value: 'es-CU' },
	{ name: 'Spanish (Dominican Republic)', value: 'es-DO' },
	{ name: 'Spanish (Ecuador)', value: 'es-EC' },
	{ name: 'Spanish (El Salvador)', value: 'es-SV' },
	{ name: 'Spanish (Equatorial Guinea)', value: 'es-GQ' },
	{ name: 'Spanish (Guatemala)', value: 'es-GT' },
	{ name: 'Spanish (Honduras)', value: 'es-HN' },
	{ name: 'Spanish (Mexico)', value: 'es-MX' },
	{ name: 'Spanish (Nicaragua)', value: 'es-NI' },
	{ name: 'Spanish (Panama)', value: 'es-PA' },
	{ name: 'Spanish (Paraguay)', value: 'es-PY' },
	{ name: 'Spanish (Peru)', value: 'es-PE' },
	{ name: 'Spanish (Puerto Rico)', value: 'es-PR' },
	{ name: 'Spanish (Spain)', value: 'es-ES' },
	{ name: 'Spanish (Uruguay)', value: 'es-UY' },
	{ name: 'Spanish (US)', value: 'es-US' },
	{ name: 'Spanish (Venezuela)', value: 'es-VE' },
	{ name: 'Sundanese (Indonesia)', value: 'su-ID' },
	{ name: 'Swahili (Kenya)', value: 'sw-KE' },
	{ name: 'Swahili (Tanzania)', value: 'sw-TZ' },
	{ name: 'Swedish (Sweden)', value: 'sv-SE' },
	{ name: 'Tamil (India)', value: 'ta-IN' },
	{ name: 'Tamil (Malaysia)', value: 'ta-MY' },
	{ name: 'Tamil (Singapore)', value: 'ta-SG' },
	{ name: 'Tamil (Sri Lanka)', value: 'ta-LK' },
	{ name: 'Telugu (India)', value: 'te-IN' },
	{ name: 'Thai (Thailand)', value: 'th-TH' },
	{ name: 'Turkish (Turkey)', value: 'tr-TR' },
	{ name: 'Ukrainian (Ukraine)', value: 'uk-UA' },
	{ name: 'Urdu (India)', value: 'ur-IN' },
	{ name: 'Urdu (Pakistan)', value: 'ur-PK' },
	{ name: 'Uzbek (Uzbekistan)', value: 'uz-UZ' },
	{ name: 'Vietnamese (Vietnam)', value: 'vi-VN' },
	{ name: 'Welsh', value: 'cy-GB' },
	{ name: 'Zulu (South Africa)', value: 'zu-ZA' },
];
export class AivoovNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AiVOOV - Text to Speech',
		name: 'aivoovNode',
		icon: 'file:aivoov.svg',
		group: ['transform'],
		version: 1,
		description:
			'AiVOOV now offers a seamless text-to-speech service, enabling you to convert text into natural-sounding audio for various workflows and applications.',
		defaults: {
			name: 'AiVOOV - Text to Speech',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'aivoovNodeApi',
				required: true,
			},
		],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Language',
				name: 'country',
				type: 'options',
				options: country,
				default: 'en-US',
			},
			{
				displayName: 'Select Voice Name or ID',
				name: 'voiceId',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
				default: '',
				typeOptions: {
					loadOptionsDependsOn: ['country'],
					loadOptionsMethod: 'getDropdownOptions', // Matches the method name
				},
			},
			{
				displayName: 'Text',
				name: 'myText',
				required: true,
				typeOptions: {
					rows: 4,
				},
				type: 'string',
				default: '',
				placeholder: 'Type or paste your text here',
				description: 'Enter the text you want to convert to speech',
			},
		],
	};
	methods = {
		loadOptions: {
			async getDropdownOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let voiceCountry = this.getCurrentNodeParameter('country') as string;
				const credentials = await this.getCredentials('aivoovNodeApi');
				const apiKey = credentials.apiKey as string;
				const response = await this.helpers.request({
					method: 'GET',
					url: 'https://aivoov.com/api/v7/voices?language_code=' + voiceCountry, // Replace with your API URL
					json: true,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-API-KEY': `${apiKey}`,
					},
				});
				// Transform API response into the format n8n expects
				const options = response.data.map((item: any) => ({
					name: item.label,
					value: item.value,
				}));
				if (options.length > 0) {
					this.getNode().parameters.voiceId = options[1].value;
				}
				return options;
			},
		},
	};
	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const credentials = await this.getCredentials('aivoovNodeApi');
		if (!credentials) {
			throw new NodeOperationError(this.getNode(), 'No credentials returned!');
		}

		const apiKey = credentials.apiKey as string;

		let item: INodeExecutionData;
		let myText: string;
		let voiceId: string;

		// Iterates over all input items and add the key "myText" with the
		// value the parameter "myText" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				myText = this.getNodeParameter('myText', itemIndex, '') as string;
				voiceId = this.getNodeParameter('voiceId', itemIndex, '') as string;
				item = items[itemIndex];
				const response = await this.helpers.request({
					method: 'POST',
					url: `https://aivoov.com/api/v7/create`,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-API-KEY': `${apiKey}`,
					},
					formData: {
						voice_id: voiceId,
						'transcribe_text[]': myText,
					},
				});
				const data = JSON.parse(response);
				item.json.status = data.status;
				item.json.message = data.message;
				if (data.status == true) {
					item.json.audio = data.transcribe_uri;
				}
			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [items];
	}
}
