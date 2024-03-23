import { ConfigChecker } from 'configchecker';

const config = ConfigChecker.from({
    ...process.env,
});

export const OPENAI_API_KEY = config.get('OPENAI_API_KEY').value;
