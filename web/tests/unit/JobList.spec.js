import { mount } from '@vue/test-utils'
import JobList from '@/components/JobList'

const resultData = {
    id: 1,
    username: "mario.bros",
    display_name: "Mario Bros.",
    jobs: [
      {
        id: 1,
        classification: "Plumbers",
        location: "Brooklyn, NYC",
        headline: "My toilet won't flush",
        description: "There is a problem with my toilet and I need someone to fix it.",
        date_added: "2023-11-03T12:58:13.984Z"
      },
      {
        id: 2,
        classification: "Plumbers",
        location: "Brooklyn, NYC",
        headline: "Leaky tap needs fixing",
        description: "The tap in my kitchen is dripping all of the time, please fix it.",
        date_added: "2023-11-05T15:48:13.984Z"
      }
    ]
  }

describe('JobList', () => {
  it('render the job list with details', () => {
    const wrapper = mount(JobList, {
        props: {
            result: resultData
        }
    });
    const column = wrapper.findAll('.column');
    expect(column.length).toBe(2);
    expect(wrapper.find('.user-display-name').exists()).toBe(true);
    expect(wrapper.find('.user-display-name').text()).toMatch('Name: Mario Bros.');
    
    expect(column.at(0).find('.location').text()).toMatch('Brooklyn, NYC');
    expect(column.at(0).find('.classification').text()).toMatch('Plumbers');
    expect(column.at(0).find('h3').text()).toMatch("My toilet won't flush");
    expect(column.at(0).find('.description').text()).toMatch('There is a problem with my toilet and I need someone to fix it.');
    expect(column.at(0).find('.date-added').text()).toMatch('2023-11-03 12:58 pm');
  })

  it('does not render the job list when its not available', () => {
    const wrapper = mount(JobList, {
        props: {
            result: {
                id: 1,
                username: "mario.bros",
                display_name: "Mario Bros.",
            }
        }
    });
    const column = wrapper.findAll('.column');
    expect(column.length).toBe(0);
    expect(wrapper.find('h3').text()).toMatch('There is no any job listing with Mario Bros.');
  })
})
