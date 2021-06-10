import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { HeaderComponent } from './header.component';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

test('HeaderComponent render', () => {
	const component = shallow(<HeaderComponent />);
	expect(toJson(component)).toMatchSnapshot();
});
