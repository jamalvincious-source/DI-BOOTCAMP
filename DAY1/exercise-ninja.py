import builtins


class Phone:
	def __init__(self, phone_number):
		self.phone_number = phone_number
		self.call_history = []
		self.messages = []

	def call(self, other_phone):
		call_record = f"{self.phone_number} called {other_phone.phone_number}"
		self.call_history.append(call_record)
		builtins.print(call_record)

	def show_call_history(self):
		builtins.print(self.call_history)

	def send_message(self, other_phone, content):
		message = {
			"to": other_phone.phone_number,
			"from": self.phone_number,
			"content": content,
		}
		self.messages.append(message)
		other_phone.messages.append(message.copy())

	def show_outgoing_messages(self):
		outgoing = [
			message for message in self.messages
			if message["from"] == self.phone_number
		]
		builtins.print(outgoing)

	def show_incoming_messages(self):
		incoming = [
			message for message in self.messages
			if message["to"] == self.phone_number
		]
		builtins.print(incoming)

	def show_messages_from(self, phone):
		phone_number = phone.phone_number if isinstance(phone, Phone) else phone
		messages = [
			message for message in self.messages
			if message["from"] == phone_number
		]
		builtins.print(messages)
