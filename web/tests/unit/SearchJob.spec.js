import { mount } from '@vue/test-utils'
import SearchJob from '@/components/SearchJob'

const optionsMock = [
    { text: 'mario.bros', value: 1 },
    { text: 'fix.it.felix.jr', value: 2 },
    { text: 'shinra.inc', value: 3 }
];

describe('SearchJob', () => {
  it('render the heading above select box', () => {
    const wrapper = mount(SearchJob);
    expect(wrapper.find('h1').isVisible()).toBe(true);
    expect(wrapper.find('h1').text()).toMatch('Search the jobs by username');
  })

  it('render the select box with users list', async () => {
    const wrapper = mount(SearchJob, {
      data() {
        return {
          options: optionsMock
        }
      }
    });
    
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.findAll('option').length).toBe(4);
  })
})
