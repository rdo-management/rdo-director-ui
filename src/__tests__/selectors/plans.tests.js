import { List, Map } from 'immutable';
import matchers from 'jasmine-immutable-matchers';

import { getFilesList } from '../../js/selectors/plans';
import { Plan, PlanFile } from '../../js/immutableRecords/plans';

fdescribe('plans getFilesList selector', () => {
  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  describe('no files present', () => {
    const state = {
      plans: Map({
        isFetchingPlans: false,
        conflict: undefined,
        currentPlanName: undefined,
        editingPlan: undefined,
        all: List()
      })
    };

    it('returns an empty List', () => {
      expect(getFilesList(state)).toEqualImmutable(List());
    });
  });

  describe('files selected, but no matching plan (i.e. new plan)', () => {
    const state = {
      plans: Map({
        isFetchingPlans: false,
        conflict: undefined,
        currentPlanName: undefined,
        editingPlan: Map({
          planName: 'overcloud',
          files: [
            { name: 'foo.yaml', content: 'foo' },
            { name: 'bar.yaml', content: 'bar' }
          ]
        }),
        all: List()
      })
    };

    it('returns a List of PlanFile records', () => {
      expect(getFilesList(state)).toEqualImmutable(List.of(
        new PlanFile({ name: 'bar.yaml', contents: 'bar' }),
        new PlanFile({ name: 'foo.yaml', contents: 'foo' })
      ));
    });
  });

  describe('no files selected, but matching plan found (i.e. edit plan)', () => {
    const state = {
      plans: Map({
        isFetchingPlans: false,
        conflict: undefined,
        currentPlanName: undefined,
        editingPlan: Map({ name: 'overcloud' }),
        all: List.of(
          new Plan({
            name: 'overcloud',
            files: List.of(
              new PlanFile({ name: 'foo.yaml', contents: 'foo' }),
              new PlanFile({ name: 'bar.yaml', contents: 'bar' })
            )
          })
        )
      })
    };

    it('returns a List of PlanFile records', () => {
      expect(getFilesList(state)).toEqualImmutable(List.of(
        new PlanFile({ name: 'bar.yaml', contents: 'bar' }),
        new PlanFile({ name: 'foo.yaml', contents: 'foo' })
      ));
    });
  });

  describe('files selected and matching plan found', () => {
    const state = {
      plans: Map({
        isFetchingPlans: false,
        conflict: undefined,
        currentPlanName: undefined,
        editingPlan: Map({
          planName: 'overcloud',
          files: [
            { name: 'foo.yaml', content: 'foo' },
            { name: 'bar.yaml', content: 'changed' },
            { name: 'new.yaml', content: 'new' }
          ]
        }),
        all: List.of(
          new Plan({
            name: 'overcloud',
            files: List.of(
              new PlanFile({ name: 'foo.yaml', contents: 'foo' }),
              new PlanFile({ name: 'bar.yaml', contents: 'bar' })
            )
          })
        )
      })
    };

    fit('returns a List of PlanFile records with new/changed flags', () => {
      expect(getFilesList(state)).toEqualImmutable(List.of(
        new PlanFile({
          name: 'bar.yaml',
          contents: 'changed',
          info: Map({ changed: true, newFile: false })
        }),
        new PlanFile({
          name: 'foo.yaml',
          contents: 'foo',
          info: Map({ changed: false, newFile: false })
        }),
        new PlanFile({
          name: 'new.yaml',
          contents: 'new',
          info: Map({ newFile: true })
        })
      ));
    });
  });
});
