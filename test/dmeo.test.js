/**
 * @description test的demo
 * @author 比欧外
 */

function cha(a, b) {
  return a - b;
}

test("23-4=19", () => {
  const res = cha(23, 4);
  expect(res).toBe(19);
});
