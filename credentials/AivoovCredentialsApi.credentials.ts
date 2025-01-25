import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AivoovCredentialsApi implements ICredentialType {
	name = 'aivoovNodeApi';
	displayName = 'AiVOOV API';
	documentationUrl = 'https://github.com/AiVOOV/aivoov-api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
    		// Can be body, header, qs or auth
			qs: {
        		// Use the value from `apiKey` above
				'api_key': '={{$credentials.apiKey}}'
			}

		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: '',
			url: 'https://aivoov.com/api/v7/checkKey',
		},
	};
}
