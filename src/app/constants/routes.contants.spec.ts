import { ROUTES_CONST } from './routes.constants';

describe('ROUTES_CONST', () => {

  it('should get a home route', () => {
    expect(ROUTES_CONST.HOME).toBe('/home');
  });

  it('should get a create route', () => {
    expect(ROUTES_CONST.CREATE).toBe('/create');
  });

  it('should get a edit route', () => {
    const id = 12;
    const route = ROUTES_CONST.EDIT(id);

    expect(route).toBe(`/edit/${id}`);
  });
});
