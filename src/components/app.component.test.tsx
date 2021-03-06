import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppComponent } from './app.component';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

test('AppComponent render', () => {
	const component = shallow(
		<Router>
			<QueryClientProvider client={queryClient}>
				<AppComponent />
			</QueryClientProvider>
		</Router>
	);

	expect(toJson(component)).toMatchSnapshot();
});
