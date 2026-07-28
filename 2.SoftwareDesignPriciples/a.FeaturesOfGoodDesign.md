Cost and time are two of the most valuable metrics when developing any software product. Less time in development means entering the market earlier than competitors. Lower development costs mean more money is left for marketing and a broader reach to potential customers.

## Code Reuse
- Code reuse is one of the most common ways to reduce development costs. The intent is pretty obvious: instead of develop- ing something over and over from scratch, why don’t we reuse existing code in new projects?
- The idea looks great on paper, but it turns out that making existing code work in a new context usually takes extra effort. Tight coupling between components, dependencies on con- crete classes instead of interfaces, hardcoded operations—all of this reduces flexibility of the code and makes it harder to reuse it
- Using design patterns is one way to increase flexibility of software components and make them easier to reuse. However, this sometimes comes at the price of making the components more complicated.


> Piece Of Wisdom of Erich Gamma
> - At the lowest level, you reuse classes: class libraries, containers, maybe some class “teams” like container/iterator.
Frameworks are at the highest level. They really try to distill your design decisions. They identify the key abstractions for solving a problem, represent them by classes and define relationships between them. JUnit is a small framework, for example. It is the “Hello, world” of frameworks. It has Test ,
TestCase , TestSuite and relationships defined.
A framework is typically larger-grained than just a single class. Also, you hook into frameworks by subclassing somewhere. They use the so-called Hollywood principle of “don’t call us, we’ll call you.” The framework lets you define your custom behavior, and it will call you when it’s your turn to do something. Same with JUnit, right? It calls you when it wants to execute a test for you, but the rest happens in the framework. There also is a middle level. This is where I see patterns. Design patterns are both smaller and more abstract than rameworks. They’re really a description about how a couple of classes can relate to and interact with each other. The level of reuse increases when you move from classes to patterns and finally frameworks.
What is nice about this middle layer is that patterns offer reuse in a way that is less risky than frameworks. Building a framework is high-risk and a significant investment. Patterns let you reuse design ideas and concepts independ
