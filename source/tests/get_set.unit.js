/**
 * @jest-environment jsdom
 */

const { getUnusedProjectId, addProjectToLocalStorage, getAllUserProjects, addEntry } = require('../assets/scripts/get_set_from_localStorage.js')
const ele1 = document.createElement('div')
const ele2 = document.createElement('div')
const container = document.createElement('div')
const container2 = document.createElement('div')
const button = document.createElement('button')
ele1.setAttribute('id', 'test1')
ele2.setAttribute('id', 'test2')
container.setAttribute('id', 'inputcontainer')
container2.setAttribute('id', 'inputcontainer2')
container2.appendChild(button)
document.body.appendChild(ele1)
document.body.appendChild(ele2)
document.body.appendChild(container)
document.body.appendChild(container2)

describe('Testing getUnusedProjectId...', () => {
  const id = 1
  window.localStorage.setItem('current_max_project_id', JSON.stringify(id))
  const unusedId = getUnusedProjectId()
  const storage = JSON.parse(window.localStorage.getItem('current_max_project_id'))
  test('Testing if localStorage is changed...', () => {
    expect(storage).toEqual(id + 1)
  })
  test('Testing if returned unused Id is correct...', () => {
    expect(unusedId).toEqual(id + 1)
  })
})

describe('Testing addProjectToLocalStorage and getAllUserProjects...', () => {
  const id = 1
  window.localStorage.setItem('current_max_project_id', JSON.stringify(id))
  addProjectToLocalStorage({})
  const storage = JSON.parse(window.localStorage.getItem('user_projects'))
  test('Testing if localStorage is changed...', () => {
    expect(storage.length).toEqual(1)
  })
  test('Testing if project_id is correct...', () => {
    expect(storage[0].project_id).toEqual(id + 1)
  })
  const array = getAllUserProjects()
  test('Testing if output array length is correct...', () => {
    expect(array.length).toEqual(1)
  })
  test('Testing if output array objects are correct...', () => {
    expect(array[0].project_id).toEqual(id + 1)
  })
})

describe('Testing addEntry...', () => {
  const id = 1
  window.localStorage.setItem('current_max_entry_id', JSON.stringify(id))
  addEntry({ selected_project_entries: [] }, {})
  const storage = JSON.parse(window.localStorage.getItem('selected_project'))
  const entry_id = JSON.parse(window.localStorage.getItem('current_max_entry_id'))
  test('Testing if current_max_entry_id is increased...', () => {
    expect(entry_id).toEqual(id + 1)
  })
  test('Testing if project is in localStorage...', () => {
    expect(storage).toEqual({ selected_project_entries: [{ entry_id: 2 }] })
  })
})
