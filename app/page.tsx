'use client';

import Image from 'next/image';
import { Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
	const [ quote, setQuote ] = useState('');
	const [ author, setAuthor ] = useState('');

	useEffect(
		() => {
			// Fetch a random quote from an API (e.g., Quotable API)
			fetch('https://api.quotable.io/random').then(response => response.json()).then(data => {
				setQuote(data.content);
				setAuthor(data.author);
			});
		},
		[]
	);

	const fetchNewQuote = () => {
		// Fetch a new random quote
		fetch('https://api.quotable.io/random').then(response => response.json()).then(data => {
			setQuote(data.content);
			setAuthor(data.author);
		});
	};

	const tweetQuote = () => {
		// Create a Twitter intent URL to share the current quote
		const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
		window.open(tweetURL);
	};

	return (
		<div id="quote-box">
			<div id="text" className="absolute top-0 left-0 p-6">{quote}</div>
			<div id="author" className="absolute top-36 right-2 p-2">- {author}</div>
			<button id="new-quote" className="absolute bottom-0 left-0" onClick={fetchNewQuote}>
				New Quote
			</button>
			<a
				id="tweet-quote"
				className="absolute bottom-0 right-0"
				onClick={tweetQuote}
				href="twitter.com/intent/tweet"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Twitter color="#000000" />
			</a>
		</div>
	);
}
