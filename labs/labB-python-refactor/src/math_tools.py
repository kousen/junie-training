def add(a,b):
    return a + b

def mul(a,b):
    return a*b

class calc:
    def __init__(self): 
        self.mem=0
    
    def add_to_mem(self,x): 
        self.mem=self.mem+x
