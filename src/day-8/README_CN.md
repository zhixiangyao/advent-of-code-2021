# --- 第八天: 七段搜索 ---

# --- Part One ---

你刚到达安全的洞穴， 鲸鱼就冲进了洞口， 把洞口撞塌了。 传感器指示在更深的地方有另一个出口， 所以你别无选择， 只能继续前进。

当你的潜艇缓慢地通过洞穴系统时， 你注意到你的潜艇上的 4 位数字 7 段显示器发生了故障; 肯定是在逃跑过程中损坏的。 没有他们你会有很多麻烦， 所以你最好弄清楚是什么问题。

通过打开或关闭名为 a 到 g 的 7 个片段中的任意一个来呈现 7 段显示器的每个数字:

```
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
```

所以， 为了渲染一个 1， 只有片段 c 和 f 会被打开; 剩下的就完了。 为了渲染一个 7， 只有片段 a, c 和 f 会被打开。

问题是， 在每个显示器上控制片段的信号混淆了。 潜艇仍然试图通过在信号线 a 到 g 上产生输出来显示数字， 但这些信号线是随机连接到片段上的。 更糟糕的是， 每个四位数显示器的线/段连接都被分开混合了! (不过， 显示器中的所有数字都使用相同的连接。 )

所以， 你可能知道只有 b 和 g 信号线是打开的， 但这并不意味着 b 和 g 段是打开的:使用两个段的唯一数字是 1， 所以它一定意味着 c 和 f 段是打开的。 有了这些信息， 你仍然不能分辨哪条线(b/g)到哪条线段(c/f)。 为此， 你需要收集更多的信息。

对于每个显示， 您要观察一段时间的信号变化， 记录所有 10 个独特的信号模式， 然后写下一个 4 位数的输出值(您的谜题输入)。 使用信号模式， 您应该能够计算出哪个模式对应哪个数字。

例如， 以下是你可能在你的笔记中看到的单个条目:

```
acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
```

(条目在这里被换行为两行， 所以它适合; 在你们的笔记中， 它都在一行上。)

每个条目包含 10 个唯一的信号模式， 一个 | 分隔符， 最后是 4 位输出值。 在一个条目中， 使用相同的线/段连接(但您不知道实际的连接是什么)。 独特的信号模式对应于潜艇试图使用当前的线/段连接来呈现数字的十种不同方式。 因为 7 是唯一一个使用 3 段的数字， 上面例子中的 dab 意味着要渲染 7， 信号线 d、a 和 b 是打开的。 因为 4 是唯一一个使用 4 段的数字， eafb 意味着要渲染 4， 信号线 e、a、f 和 b 都是开启的。

使用这些信息， 您应该能够计算出对应于十个数字中的每一个的信号线组合。 然后， 您可以解码四位数的输出值。 不幸的是， 在上面的示例中， 输出值(cdfeb fcadb cdfeb cdbaf)中的所有数字都使用了 5 个段， 因此很难推断。

现在， 专注于简单的数字。 考虑这个更大的例子:

```
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
```

因为数字 1、4、7 和 8 都使用唯一数目的段， 所以您应该能够分辨出哪些信号组合对应于这些数字。 只计算输出值中的数字(每一行的|之后的部分)， 在上面的示例中， 有 26 个数字实例使用唯一数目的段(上面突出显示)。

在输出值中， 数字 1、4、7 或 8 出现了多少次?
