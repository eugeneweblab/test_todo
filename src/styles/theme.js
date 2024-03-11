const heading = `
	font-family: var(--primary-font);
	font-weight: 600;
	color: var(--primary-black);
	line-height: 1.55;	
`;

const body = `
	font-family: var(--primary-font);
	font-size: 14px;
	line-height: 1.55;
	letter-spacing: 0.1px;
	color: var(--primary-black);
`;

const theme = {

    h1: `
		${heading}
		font-size: 36px;
	`,

    h2: `
		${heading}
		font-size: 24px;
	`,

    h3: `
		${heading}
		font-size: 18px;
	`,

    h4: `
		${heading}
		font-size: 14px;
	`,

    h5: `
		${heading}
		font-size: 12px;
	`,

    h6: `
		${heading}
		font-size: 12px;
	`,

    p: `
		${body}
		margin-bottom: 12px;
	`,

    span: `
		${body}	
	`,

	'text-01': `
		${body}	
		line-height: 1.14;
	`,

	'text-02': `
		${body}	
		line-height: 1.42;
		font-weight: 600;
	`,

	'error': `
		${body}
		font-size: 10px;
		line-height: 1.17;
	`,

};

export default theme;
