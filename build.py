from os import system
from time import time
from colorama import init, Fore

init()

src = 'src/'
files = [
	'service.ts',
	'thread.ts',
	'pool.ts',
	'router.ts',
	'config.ts',
	'profiler.ts',
	'server.ts',
	'ash.ts'
]

print(f"Building Framework: {Fore.YELLOW}Ash{Fore.RESET}")

s = time()

for file in files:
	print(f"- Compiling file: {file}, path: {src+file}")
	start = time()
	if system(f"tsc {src+file} -t es6 -allowSyntheticDefaultImports -module commonJS") != 0:
		print(f"* Compiling file: {Fore.RED}{file} FAILED{Fore.RESET}")
	else:
		end = time()
		print(f"+ File Compiled: {Fore.CYAN}{file}{Fore.RESET}, in: {Fore.GREEN}{end-start}s{Fore.RESET}")

e = time()

print(f"Framework built: {Fore.YELLOW}Ash{Fore.RESET}, in: {Fore.GREEN}{e-s}s{Fore.RESET}")