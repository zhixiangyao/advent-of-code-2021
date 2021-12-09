# --- Day 2: 潜水! ---

# --- Part One ---

现在, 你得弄清楚如何驾驶这东西.

似乎潜艇可以接受一系列的命令, 如向前 1, 向下 2, 或向上 3:

- 向前 X 将水平位置增加 X 个单位.
- 向下 X 增加 X 个单位的深度.
- 向上 X 减少 X 单位的深度.

注意, 因为你是在潜艇上, 上下会影响你的深度, 所以它们的结果可能与你预期的相反.

潜艇似乎已经有一个计划的航线(你的谜题输入). 你应该弄清楚它的去向. 例如:

```
forward 5
down 5
forward 8
up 3
down 8
forward 2
```

你的水平位置和深度都从 0 开始. 然后上面的步骤将修改它们如下:

- `forward 5` adds `5` to your horizontal position, a total of `5`.
- `down 5` adds `5` to your depth, resulting in a value of `5`.
- `forward 8` adds `8` to your horizontal position, a total of `13`.
- `up 3` decreases `y`our depth by `3`, resulting in a value of `2`.
- `down 8` adds `8` to your depth, resulting in a value of `10`.
- `forward 2` adds `2` to your horizontal position, a total of `15`.

按照这些说明, 你的水平位置为 15, 深度为 10. (将这些数字相乘就会得到 150.)

计算水平位置和深度后, 你将有计划的路线. **如果你将最终水平位置乘以最终深度, 你会得到什么?**

# --- Part Two ---

根据你的计算, 计划的路线似乎没有任何意义. 你找到潜艇手册, 发现这个过程实际上稍微复杂一些.

除了水平位置和深度, 你还需要跟踪第三个值, **aim**, 它也从 0 开始. 这些命令的含义也与你最初的想法完全不同:

- `down X` **increases** your aim by X units.
- `up X` **decreases** your aim by X units.
- `forward X` does two things:
  - It increases your horizontal position by X units.
  - It increases your depth by your aim multiplied by X.

再次注意, 因为你是在潜艇上, 向下和向上的作用可能与你的预期相反: 向下 意味着朝着积极的方向.

上面的例子做了一些不同的事情:

- `forward 5` adds `5` to your horizontal position, a total of `5`. Because your aim is `0`, your depth does not change.
- `down 5` adds `5` to your aim, resulting in a value of `5`.
- `forward 8` adds `8` to your horizontal position, a total of 13. Because your aim is `5`, your depth increases by `8*5=40`.
- `up 3` decreases your aim by `3`, resulting in a value of `2`.
- `down 8` adds `8` to your aim, resulting in a value of `10`.
- `forward 2` adds `2` to your horizontal position, a total of `15`. Because your aim is `10`, your depth increases by `2*10=20` to a total of `60`.

按照这些新的说明, 你的水平位置是 15, 深度是 60. (将它们相乘就会得到 900. )

使用这些命令的新解释, 计算在遵循计划的航向之后的水平位置和深度. **如果你将最终水平位置乘以最终深度, 你会得到什么?**
